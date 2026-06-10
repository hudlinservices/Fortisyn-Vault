#!/usr/bin/env node

/**
 * Agent CLI Runner for My Brain Agentic OS.
 * Powered by DeepSeek (OpenAI-compatible API).
 *
 * Usage:
 *   node run-agent.js --agent-def <path> --outcome "<description>" --project <path> [--resume <run-log-path>]
 *
 * Environment:
 *   DEEPSEEK_API_KEY — your DeepSeek API key (required)
 *
 * Exit codes:
 *   0 — completed successfully
 *   1 — failed (unrecoverable error)
 *   2 — awaiting decision (human must review run log and re-invoke with --resume)
 */

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const { getToolDefinitions, executeTool } = require('./tools');
const {
  createRunLog, readRunLog, getLastCompletedStep,
  hasUnresolvedDecision, updateRunLog, appendToRunLog,
  parseFrontmatter
} = require('./run-log');
const { checkGate, checkToolGate, isAmbiguous, surfaceDecision } = require('./gates');
const { acquireLock, releaseLock } = require('./lock');

const VAULT_ROOT = path.resolve(__dirname, '..', '..');

// ─── CLI Argument Parsing ───────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {};

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--agent-def':
        parsed.agentDef = args[++i];
        break;
      case '--outcome':
        parsed.outcome = args[++i];
        break;
      case '--project':
        parsed.project = args[++i];
        break;
      case '--run-log':
        parsed.runLog = args[++i];
        break;
      case '--resume':
        parsed.resume = true;
        if (args[i + 1] && !args[i + 1].startsWith('--')) {
          parsed.runLog = args[++i];
        }
        break;
      case '--help':
        console.log(`Usage: node run-agent.js [options]

Options:
  --agent-def <path>   Path to agent definition file (required)
  --outcome <text>     Desired outcome (required for new runs)
  --project <path>     Project hub path (optional)
  --run-log <path>     Run log path (required for resume, optional for new)
  --resume             Resume an existing run from the last checkpoint
  --help               Show this help

Environment:
  DEEPSEEK_API_KEY     Your DeepSeek API key (required)

Exit codes:
  0 — completed successfully
  1 — failed (unrecoverable error)
  2 — awaiting decision (review run log, re-invoke with --resume)
`);
        process.exit(0);
    }
  }

  if (!parsed.agentDef) {
    console.error('Error: --agent-def is required');
    process.exit(1);
  }

  if (!parsed.resume && !parsed.outcome) {
    console.error('Error: --outcome is required for new runs');
    process.exit(1);
  }

  return parsed;
}

// ─── Load Agent Definition ──────────────────────────────────────────

function loadAgentDef(agentDefPath) {
  const fullPath = path.join(VAULT_ROOT, agentDefPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Error: Agent definition not found: ${agentDefPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const { data, body } = parseFrontmatter(content);

  const sysPromptMatch = body.match(/## System Prompt\n\n([\s\S]*?)(?=\n## |$)/);
  const systemPrompt = sysPromptMatch ? sysPromptMatch[1].trim() : '';

  return {
    path: agentDefPath,
    frontmatter: data,
    systemPrompt,
    body,
    filePath: fullPath
  };
}

// ─── Assemble System Message ────────────────────────────────────────

function assembleSystemPrompt(agentDef, skillTemplates) {
  const skillsContext = skillTemplates.length > 0
    ? `\n\n## Available Skill Templates\n\n${skillTemplates.map(s => `- ${s.name}: ${s.path}\n  ${s.purpose}`).join('\n')}`
    : '';

  const toolsContext = `
## Available Tools

You have access to these tools via function calling:
- read_file: Read any vault file (skill templates, project hubs, notes)
- write_file: Create or append to files (for run logs and new content)
- run_script: Execute automation scripts from 30-Automations/scripts/
- search_vault: Search for keywords or patterns across the vault
- surface_decision: Pause execution and ask human for input

## Decision Gates

You MUST pause (via surface_decision) before:
${(agentDef.frontmatter.confirmation_gates || []).map(g => `- ${g}`).join('\n')}
- Any creative choice where the human should decide between options
- Any error or unexpected situation you cannot resolve

## Operating Instructions

1. First, plan: write your plan to the run log using write_file
2. Execute steps one at a time
3. After each step, log completion: \`### Step N: [Name]\\n[STEP_COMPLETE] — timestamp\`
4. At decision gates, use surface_decision and stop
5. On completion, write a final summary
`;

  return `${agentDef.systemPrompt}${skillsContext}\n${toolsContext}`;
}

// ─── Load .env from vault root ──────────────────────────────────────

function loadEnv() {
  const envPath = path.join(VAULT_ROOT, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.substring(0, eqIdx).trim();
      const value = trimmed.substring(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
}

// ─── DeepSeek Client ────────────────────────────────────────────────

function createClient() {
  const apiKey = process.env.DEEPSEEK_API_KEY || '';
  if (!apiKey) {
    console.error('Error: DEEPSEEK_API_KEY environment variable is not set.');
    console.error('Set it with: export DEEPSEEK_API_KEY="sk-..."');
    process.exit(1);
  }

  return new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://api.deepseek.com/v1'
  });
}

// ─── Main Execution ─────────────────────────────────────────────────

async function main() {
  loadEnv();  // Load .env from vault root before anything else
  const args = parseArgs();
  const agentDef = loadAgentDef(args.agentDef);
  const openai = createClient();
  const model = agentDef.frontmatter.model_preference || 'deepseek-chat';

  // Determine run log path
  let runLogPath;
  let runLog;

  if (args.resume) {
    if (!args.runLog) {
      console.error('Error: --run-log is required with --resume');
      process.exit(1);
    }
    runLogPath = args.runLog;
    runLog = readRunLog(runLogPath);
    if (runLog.error) {
      console.error(`Error: ${runLog.error}`);
      process.exit(1);
    }
  } else {
    const result = createRunLog(args.agentDef, args.outcome, args.project);
    runLogPath = result.relativePath;
    runLog = readRunLog(runLogPath);
  }

  // Acquire lock
  try {
    acquireLock(runLogPath);
  } catch (e) {
    console.error(`Lock error: ${e.message}`);
    process.exit(1);
  }

  // Check if there's an unresolved decision on resume
  if (args.resume && hasUnresolvedDecision(runLog.content)) {
    console.log('Run log has unresolved decision. Checking for human response...');

    const decisionResolved = runLog.content.match(/\[DECISION_RESOLVED\].*?\n\*\*Your response\*\*:\s*(.*)/s);
    if (!decisionResolved) {
      console.log('No human response found yet. Agent is still awaiting decision.');
      console.log(`Review the run log and add your response: ${runLogPath}`);
      releaseLock(runLogPath);
      process.exit(2);
    }

    console.log(`Human response found: "${decisionResolved[1].trim()}"`);
    console.log('Resuming execution...');
  }

  // Load allowed skills
  const skillTemplates = [];
  const allowedSkills = agentDef.frontmatter.allowed_skills || [];
  for (const skillLink of allowedSkills) {
    const linkMatch = skillLink.match(/\[\[([^\]]+)\]\]/);
    if (linkMatch) {
      const skillPath = linkMatch[1];
      const fullPath = path.join(VAULT_ROOT, skillPath + '.md');
      if (fs.existsSync(fullPath)) {
        const skillContent = fs.readFileSync(fullPath, 'utf-8');
        const { data } = parseFrontmatter(skillContent);
        const purposeMatch = skillContent.match(/## Purpose\n\n([\s\S]*?)(?=\n## |$)/);
        skillTemplates.push({
          name: data.name || path.basename(skillPath),
          path: skillPath,
          purpose: purposeMatch ? purposeMatch[1].trim() : 'No purpose defined',
          agentSteps: data.agent_steps || []
        });
      }
    }
  }

  // Assemble system prompt
  const systemPrompt = assembleSystemPrompt(agentDef, skillTemplates);

  const toolDefs = getToolDefinitions();

  // Assemble messages — system prompt goes in messages array (OpenAI format)
  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  if (args.resume) {
    const lastStep = getLastCompletedStep(runLog.content);
    const resumeContext = lastStep
      ? `Resuming execution. Last completed step: Step ${lastStep.stepNumber}. Continue from the next step.`
      : 'Resuming execution from the beginning.';

    messages.push({
      role: 'user',
      content: `${resumeContext}\n\nCurrent run log content:\n\`\`\`\n${runLog.content}\n\`\`\`\n\nContinue execution.`
    });
  } else {
    messages.push({
      role: 'user',
      content: `Delegated outcome: ${args.outcome}\n\nRun log path: ${runLogPath}\n\nPlan your approach using available skill templates, then execute step by step. Write your plan to the run log, then begin execution.`
    });
  }

  // Run the agent loop
  let turnCount = 0;
  const MAX_TURNS = agentDef.frontmatter.max_autonomous_steps
    ? parseInt(agentDef.frontmatter.max_autonomous_steps) * 2
    : 20;

  while (turnCount < MAX_TURNS) {
    turnCount++;

    try {
      const response = await openai.chat.completions.create({
        model: model,
        max_tokens: 4096,
        messages: messages,
        tools: toolDefs,
        tool_choice: 'auto'
      });

      const choice = response.choices[0];
      const msg = choice.message;

      // If the model wants to call a function
      if (msg.tool_calls && msg.tool_calls.length > 0) {
        // Add the assistant message with tool calls to history
        messages.push({
          role: 'assistant',
          content: msg.content || null,
          tool_calls: msg.tool_calls
        });

        // Process each tool call
        for (const toolCall of msg.tool_calls) {
          const toolName = toolCall.function.name;
          let toolArgs;
          try {
            toolArgs = JSON.parse(toolCall.function.arguments);
          } catch {
            toolArgs = {};
          }

          console.log(`[Agent] Using tool: ${toolName}(${JSON.stringify(toolArgs)})`);

          // Check if this tool call triggers a gate
          const gateCheck = checkToolGate(toolName, toolArgs, agentDef);
          if (gateCheck.gate) {
            console.log(`[Gate] ${gateCheck.type}/${gateCheck.subtype} gate triggered`);

            surfaceDecision(
              runLogPath,
              gateCheck.type,
              `Confirm: ${toolName} — ${JSON.stringify(toolArgs)}`,
              `The agent wants to execute a tool that triggers the ${gateCheck.subtype} gate.`,
              [
                { label: 'A', description: 'Approve — allow the action' },
                { label: 'B', description: 'Deny — do not proceed' },
                { label: 'C', description: 'Modify — change the parameters' }
              ]
            );

            updateRunLog(runLogPath, { status: 'awaiting_decision' });
            releaseLock(runLogPath);
            console.log(`\nDecision required. Review and respond in: ${runLogPath}`);
            console.log('Then re-invoke with: node 90-System/agents/run-agent.js --agent-def ' +
              `${args.agentDef} --resume --run-log ${runLogPath}`);
            process.exit(2);
          }

          // Execute tool
          const toolResult = await executeTool(toolName, toolArgs);

          // Log tool result
          const resultSummary = toolResult.error
            ? `Tool error: ${toolResult.error}`
            : `Tool completed: ${JSON.stringify(toolResult).substring(0, 200)}`;

          // Add tool result to messages (OpenAI format)
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult)
          });

          console.log(`[Agent] ${resultSummary}`);
        }
      } else {
        // No tool calls — text response
        const text = msg.content || '';
        if (text) {
          appendToRunLog(runLogPath, `\n${text}\n`);
          messages.push({ role: 'assistant', content: text });
        }

        const lower = text.toLowerCase();
        if (lower.includes('task complete') || lower.includes('execution complete') ||
            lower.includes('all steps complete') || lower.includes('final summary')) {
          console.log('[Agent] Task completed');
          updateRunLog(runLogPath, {
            status: 'completed',
            end_time: new Date().toISOString()
          });
          releaseLock(runLogPath);
          process.exit(0);
        }

        // Agent stopped without signaling completion
        messages.push({
          role: 'user',
          content: 'Continue execution. If all steps are complete, write a final summary and say "Task complete."'
        });
      }
    } catch (error) {
      console.error(`[Error] Turn ${turnCount}: ${error.message}`);

      if (isAmbiguous(error)) {
        surfaceDecision(
          runLogPath,
          'ambiguous',
          `Error during execution: ${error.message}`,
          `Turn ${turnCount} failed with an unexpected error.`,
          [
            { label: 'A', description: 'Retry the same step' },
            { label: 'B', description: 'Skip this step and continue' },
            { label: 'C', description: 'Abort the run and review manually' }
          ]
        );

        updateRunLog(runLogPath, { status: 'awaiting_decision' });
        releaseLock(runLogPath);
        console.log(`\nAmbiguous error occurred. Decision surfaced in: ${runLogPath}`);
        process.exit(2);
      }

      updateRunLog(runLogPath, {
        status: 'failed',
        end_time: new Date().toISOString()
      });
      releaseLock(runLogPath);
      process.exit(1);
    }
  }

  // Max turns reached
  console.log(`[Agent] Max turns (${MAX_TURNS}) reached. Pausing for review.`);
  surfaceDecision(
    runLogPath,
    'ambiguous',
    'Agent reached maximum autonomous steps. Review progress and decide next action.',
    `The agent executed ${turnCount} turns (max: ${MAX_TURNS}).`,
    [
      { label: 'A', description: 'Continue — re-invoke with --resume to proceed' },
      { label: 'B', description: 'Complete manually — agent made enough progress' },
      { label: 'C', description: 'Abort and re-delegate with a smaller scope' }
    ]
  );

  updateRunLog(runLogPath, { status: 'awaiting_decision' });
  releaseLock(runLogPath);
  console.log(`\nReview needed. Run log: ${runLogPath}`);
  process.exit(2);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
