/**
 * Decision gate system for agent execution.
 * Implements the three-gate model:
 *   1. Creative — options exist, human picks
 *   2. Destructive — publish, delete, spend money
 *   3. Ambiguous — error or unclear situation
 */

const fs = require('fs');
const path = require('path');

const VAULT_ROOT = path.resolve(__dirname, '..', '..');

/**
 * Check if an action requires a decision gate.
 * Returns { gate: true, type: 'creative'|'destructive'|'ambiguous' } or { gate: false }
 */
function checkGate(action, agentDef) {
  const gates = agentDef.confirmation_gates || ['publish', 'spend_money', 'modify_file'];

  // Check destructive gates
  const destructivePatterns = {
    publish: /publish|post|deploy|release|go live|make public/i,
    spend_money: /buy|purchase|pay|charge|spend|subscribe/i,
    modify_file: /overwrite|delete|remove|replace.*file|modify.*file/i
  };

  for (const [gate, pattern] of Object.entries(destructivePatterns)) {
    if (gates.includes(gate) && pattern.test(action)) {
      return { gate: true, type: 'destructive', subtype: gate };
    }
  }

  // Check creative patterns — agent is generating options for human to choose
  const creativePatterns = /choose between|which option|select from|pick one|headline|title|design option/i;
  if (creativePatterns.test(action)) {
    return { gate: true, type: 'creative', subtype: 'choice' };
  }

  return { gate: false };
}

/**
 * Check if a tool call triggers a gate based on the tool name and arguments.
 */
function checkToolGate(toolName, toolArgs, agentDef) {
  const gates = agentDef.confirmation_gates || ['publish', 'spend_money', 'modify_file'];

  // write_file with 'create' is fine. write_file with 'append' is fine.
  // write_file that would overwrite — that's blocked at the tool level (mode: 'create' fails if exists).
  // But if the tool was somehow going to modify an existing file, gate it.
  if (toolName === 'write_file' && gates.includes('modify_file')) {
    if (toolArgs.mode === 'create') return { gate: false };
    const fp = (toolArgs.file_path || '').replace(/^\.\//, '');
    // Allow append to agent logs, Inbox, and temp/test files — always safe
    if (fp.includes('30-Automations/logs/')) return { gate: false };
    if (fp.includes('Inbox/')) return { gate: false };
    // Allow small append (under 3KB) — likely log updates, not content modification
    const contentSize = (toolArgs.content || '').length;
    if (contentSize < 3000) return { gate: false };
    return { gate: true, type: 'destructive', subtype: 'modify_file' };
  }

  if (toolName === 'run_script') {
    const scriptName = (toolArgs.script_path || '').toLowerCase();
    if (scriptName.includes('publish') || scriptName.includes('deploy')) {
      if (gates.includes('publish')) {
        return { gate: true, type: 'destructive', subtype: 'publish' };
      }
    }
  }

  // surface_decision is the agent voluntarily asking — not a gate check
  if (toolName === 'surface_decision') {
    return { gate: false };
  }

  return { gate: false };
}

/**
 * Determine if an error or response is ambiguous and needs human input.
 */
function isAmbiguous(error) {
  if (!error) return false;

  const ambiguousPatterns = [
    /permission denied/i,
    /authentication (failed|required)/i,
    /not found/i,
    /unexpected (error|response)/i,
    /timeout/i,
    /rate limit/i,
    /invalid.*(credentials|token|key)/i
  ];

  return ambiguousPatterns.some(p => p.test(error.message || error.toString()));
}

/**
 * Wrap decision surfacing — appends a decision block to the run log.
 */
function surfaceDecision(runLogPath, decisionType, question, context, options) {
  const fullPath = path.join(VAULT_ROOT, runLogPath);

  // Count existing decisions
  const existing = fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf-8') : '';
  const decisionMatches = existing.match(/### Decision \d+:/g);
  const nextNum = decisionMatches ? decisionMatches.length + 1 : 1;

  const optionsTable = options.map(o => `| ${o.label} | ${o.description} |`).join('\n');

  const block = `
### Decision ${nextNum}: ${question}

[AWAITING_DECISION] — ${new Date().toISOString()}

**Type**: ${decisionType}

**Context**: ${context || 'N/A'}

**Options**:
| Option | Description |
|--------|-------------|
${optionsTable}

**Your response**: _[To be filled by human]_
`;

  fs.appendFileSync(fullPath, block, 'utf-8');

  // Update frontmatter decision count
  const { data, body } = (() => {
    const c = fs.readFileSync(fullPath, 'utf-8');
    const m = c.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) return { data: {}, body: c };
    return { data: { decision_count: parseInt((c.match(/decision_count:\s*(\d+)/) || [,'0'])[1]) }, body: m[2] };
  })();

  const newCount = (data.decision_count || 0) + 1;
  const content = fs.readFileSync(fullPath, 'utf-8');
  const updated = content.replace(/decision_count:\s*\d+/, `decision_count: ${newCount}`);
  fs.writeFileSync(fullPath, updated, 'utf-8');

  return { success: true, decisionNum: nextNum };
}

module.exports = {
  checkGate,
  checkToolGate,
  isAmbiguous,
  surfaceDecision
};
