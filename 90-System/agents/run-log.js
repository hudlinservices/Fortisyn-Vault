/**
 * Run log management for agent executions.
 * Creates, reads, and updates run logs in the 30-Automations/logs/ directory.
 * Run logs are Markdown files with YAML frontmatter — the agent's state.
 */

const fs = require('fs');
const path = require('path');

const VAULT_ROOT = path.resolve(__dirname, '..', '..');

function resolveVaultPath(filePath) {
  if (filePath.startsWith('/')) return filePath;
  return path.join(VAULT_ROOT, filePath);
}

/**
 * Parse YAML frontmatter from a Markdown file.
 * Returns { data: {...}, body: '...' }
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const yamlBlock = match[1];
  const body = match[2];
  const data = {};

  // Simple YAML parser for frontmatter (handles nested objects at 1 level)
  for (const line of yamlBlock.split('\n')) {
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      let value = kvMatch[2].trim();
      // Remove surrounding quotes
      value = value.replace(/^["']|["']$/g, '');
      data[kvMatch[1]] = value;
    }
  }

  return { data, body };
}

/**
 * Stringify data to YAML frontmatter
 */
function stringifyFrontmatter(data, body) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' && (value.includes(':') || value.includes('#'))) {
      lines.push(`${key}: "${value}"`);
    } else if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - "${item}"`);
      }
    } else {
      lines.push(`${key}: ${value !== undefined ? value : ''}`);
    }
  }
  lines.push('---');
  lines.push('');
  lines.push(body);
  return lines.join('\n');
}

/**
 * Create a new agent run log file.
 */
function createRunLog(agentDefPath, outcome, projectPath) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const agentName = path.basename(agentDefPath, '.md');
  const taskSlug = outcome.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 40);
  const fileName = `${dateStr}-${agentName}-${taskSlug}.md`;
  const filePath = path.join(VAULT_ROOT, '30-Automations', 'logs', fileName);

  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const frontmatter = {
    agent: `[[${agentDefPath}]]`,
    project: projectPath ? `[[${projectPath}]]` : '',
    delegated_outcome: `"${outcome}"`,
    status: 'running',
    start_time: now.toISOString(),
    end_time: '',
    steps_total: 0,
    steps_completed: 0,
    decision_count: 0,
    decisions_resolved: 0,
    artifacts: '',
    tags: 'agent-run'
  };

  const body = `# Agent Run: ${outcome}

## Delegated Outcome

${outcome}

## Plan

<!-- Agent generates plan here before execution -->

## Execution Log

<!-- Step-by-step execution markers -->

## Decision Log

<!-- Decision gates and human responses -->

## Final Summary

<!-- Agent-generated on completion -->
`;

  const content = stringifyFrontmatter(frontmatter, body);
  fs.writeFileSync(filePath, content, 'utf-8');
  return { filePath, relativePath: `30-Automations/logs/${fileName}` };
}

/**
 * Read an existing run log and return parsed state.
 */
function readRunLog(runLogPath) {
  const fullPath = resolveVaultPath(runLogPath);
  if (!fs.existsSync(fullPath)) {
    return { error: `Run log not found: ${runLogPath}` };
  }

  const content = fs.readFileSync(fullPath, 'utf-8');
  const { data, body } = parseFrontmatter(content);

  return {
    path: fullPath,
    frontmatter: data,
    body,
    content
  };
}

/**
 * Find the last completed step in a run log.
 * Returns the step number and name, or null if no steps completed.
 */
function getLastCompletedStep(content) {
  const steps = content.match(/\[STEP_COMPLETE\].*/g);
  if (!steps || steps.length === 0) return null;

  const lastStep = steps[steps.length - 1];

  // Try to extract step number
  const stepMatch = content.match(new RegExp(`### Step (\\d+):.*\\n${lastStep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
  if (stepMatch) {
    return { stepNumber: parseInt(stepMatch[1]), marker: lastStep };
  }

  return { stepNumber: steps.length, marker: lastStep };
}

/**
 * Check if run log has an unresolved decision.
 */
function hasUnresolvedDecision(content) {
  const awaiting = content.match(/\[AWAITING_DECISION\]/g);
  if (!awaiting || awaiting.length === 0) return false;

  const resolved = content.match(/\[DECISION_RESOLVED\]/g);
  const resolvedCount = resolved ? resolved.length : 0;

  return awaiting.length > resolvedCount;
}

/**
 * Update run log frontmatter.
 */
function updateRunLog(runLogPath, updates) {
  const fullPath = resolveVaultPath(runLogPath);
  const current = readRunLog(runLogPath);
  if (current.error) return current;

  const newData = { ...current.frontmatter, ...updates };
  const content = stringifyFrontmatter(newData, current.body);
  fs.writeFileSync(fullPath, content, 'utf-8');
  return { success: true, path: runLogPath };
}

/**
 * Append to run log body.
 */
function appendToRunLog(runLogPath, text) {
  const fullPath = resolveVaultPath(runLogPath);
  fs.appendFileSync(fullPath, text, 'utf-8');
  return { success: true, path: runLogPath };
}

/**
 * Check if a step checkpoint marker exists.
 */
function stepMarkerExists(content, stepNumber, markerType) {
  const stepSection = content.match(new RegExp(`### Step ${stepNumber}:([\\s\\S]*?)(?=### Step \\d+:|## Decision|## Final|$)`, 'm'));
  if (!stepSection) return false;
  return stepSection[0].includes(`[${markerType}]`);
}

module.exports = {
  createRunLog,
  readRunLog,
  getLastCompletedStep,
  hasUnresolvedDecision,
  updateRunLog,
  appendToRunLog,
  stepMarkerExists,
  parseFrontmatter,
  stringifyFrontmatter
};
