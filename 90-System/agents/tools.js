/**
 * Tool layer for agent operations.
 * Defines tools that agents can use to interact with the vault and system.
 * Each tool is registered with a name, description, and handler function.
 */

const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

// Vault root is 3 levels up from this file
const VAULT_ROOT = path.resolve(__dirname, '..', '..');

function resolveVaultPath(filePath) {
  if (filePath.startsWith('/')) return filePath;
  return path.join(VAULT_ROOT, filePath);
}

const tools = {
  read_file: {
    name: 'read_file',
    description: 'Read the contents of a Markdown file in the vault. Use this to read skill templates, project hubs, agent definitions, or any other vault note.',
    parameters: {
      type: 'object',
      properties: {
        file_path: {
          type: 'string',
          description: 'Path to the file relative to the vault root (e.g., "20-Skills/content-creation/publish-blog-post.md")'
        }
      },
      required: ['file_path']
    },
    handler: async (args) => {
      const fullPath = resolveVaultPath(args.file_path);
      if (!fs.existsSync(fullPath)) {
        return { error: `File not found: ${args.file_path}` };
      }
      const content = fs.readFileSync(fullPath, 'utf-8');
      return { content, path: args.file_path };
    }
  },

  write_file: {
    name: 'write_file',
    description: 'Create or append to a Markdown file. Use this for writing run logs, creating new notes, or appending captures. Cannot overwrite existing files without a confirmation gate.',
    parameters: {
      type: 'object',
      properties: {
        file_path: {
          type: 'string',
          description: 'Path to the file relative to the vault root'
        },
        content: {
          type: 'string',
          description: 'Content to write or append'
        },
        mode: {
          type: 'string',
          enum: ['create', 'append'],
          description: 'create = new file (fails if exists), append = add to end of file'
        }
      },
      required: ['file_path', 'content', 'mode']
    },
    handler: async (args) => {
      const fullPath = resolveVaultPath(args.file_path);
      const dir = path.dirname(fullPath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (args.mode === 'create' && fs.existsSync(fullPath)) {
        return { error: `File already exists: ${args.file_path}. Use append mode or choose a different path.` };
      }

      if (args.mode === 'create') {
        fs.writeFileSync(fullPath, args.content, 'utf-8');
      } else if (args.mode === 'append') {
        fs.appendFileSync(fullPath, args.content, 'utf-8');
      }

      return { success: true, path: args.file_path, mode: args.mode };
    }
  },

  run_script: {
    name: 'run_script',
    description: 'Execute a shell script from the 30-Automations/scripts/ directory. Use this to run automation pipelines.',
    parameters: {
      type: 'object',
      properties: {
        script_path: {
          type: 'string',
          description: 'Path to the script relative to vault root (e.g., "30-Automations/scripts/content-distribution.sh")'
        },
        args: {
          type: 'array',
          items: { type: 'string' },
          description: 'Arguments to pass to the script'
        },
        env: {
          type: 'object',
          description: 'Environment variables to set for the script'
        }
      },
      required: ['script_path']
    },
    handler: async (args) => {
      const scriptPath = resolveVaultPath(args.script_path);
      if (!fs.existsSync(scriptPath)) {
        return { error: `Script not found: ${args.script_path}` };
      }

      return new Promise((resolve) => {
        const env = { ...process.env, ...(args.env || {}) };
        const cmd = `bash "${scriptPath}" ${(args.args || []).join(' ')}`;
        exec(cmd, { env, cwd: VAULT_ROOT, timeout: 300000 }, (error, stdout, stderr) => {
          if (error) {
            resolve({
              error: error.message,
              stdout,
              stderr,
              exitCode: error.code
            });
          } else {
            resolve({ stdout, stderr, exitCode: 0 });
          }
        });
      });
    }
  },

  search_vault: {
    name: 'search_vault',
    description: 'Search the vault for a keyword or pattern. Use grep to find references, links, or content across all Markdown files.',
    parameters: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Keyword or grep pattern to search for'
        },
        path_filter: {
          type: 'string',
          description: 'Optional: restrict search to a subdirectory (e.g., "10-Projects" or "20-Skills")'
        }
      },
      required: ['query']
    },
    handler: async (args) => {
      const searchDir = args.path_filter
        ? resolveVaultPath(args.path_filter)
        : VAULT_ROOT;

      try {
        const pattern = args.query.replace(/'/g, "'\\''");
        const cmd = `grep -rn --include="*.md" '${pattern}' "${searchDir}" 2>/dev/null | head -50`;
        const stdout = execSync(cmd, { encoding: 'utf-8', cwd: VAULT_ROOT });
        return { results: stdout.trim() || 'No matches found' };
      } catch (e) {
        // grep returns exit 1 if no matches
        if (e.status === 1) {
          return { results: 'No matches found' };
        }
        return { error: e.message };
      }
    }
  },

  surface_decision: {
    name: 'surface_decision',
    description: 'Write a decision prompt to the run log and signal that human input is needed. Use this at decision gates. The agent should exit after calling this.',
    parameters: {
      type: 'object',
      properties: {
        run_log_path: {
          type: 'string',
          description: 'Path to the agent run log file'
        },
        decision_type: {
          type: 'string',
          enum: ['creative', 'destructive', 'ambiguous'],
          description: 'Type of decision gate'
        },
        question: {
          type: 'string',
          description: 'The question for the human'
        },
        context: {
          type: 'string',
          description: 'Background context for the decision'
        },
        options: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              description: { type: 'string' }
            }
          },
          description: 'Available options for the human to choose from'
        }
      },
      required: ['run_log_path', 'decision_type', 'question', 'options']
    },
    handler: async (args) => {
      const runLogPath = resolveVaultPath(args.run_log_path);
      const decisionNum = args.decision_num || 1;

      const optionsTable = args.options.map(o => `| ${o.label} | ${o.description} |`).join('\n');

      const decisionBlock = `\n### Decision ${decisionNum}: ${args.question}\n\n` +
        `[AWAITING_DECISION] — ${new Date().toISOString()}\n\n` +
        `**Type**: ${args.decision_type}\n\n` +
        `**Context**: ${args.context || 'N/A'}\n\n` +
        `**Options**:\n` +
        `| Option | Description |\n` +
        `|--------|-------------|\n` +
        `${optionsTable}\n\n` +
        `**Your response**: _[To be filled by human]_\n`;

      fs.appendFileSync(runLogPath, decisionBlock, 'utf-8');
      return {
        success: true,
        message: 'Decision surfaced. Human must review and re-invoke agent with --resume.',
        decision_type: args.decision_type
      };
    }
  }
};

function getToolDefinitions() {
  // OpenAI function calling format
  return Object.values(tools).map(t => ({
    type: 'function',
    function: {
      name: t.name,
      description: t.description,
      parameters: t.parameters
    }
  }));
}

async function executeTool(name, args) {
  const tool = tools[name];
  if (!tool) {
    return { error: `Unknown tool: ${name}. Available tools: ${Object.keys(tools).join(', ')}` };
  }
  return tool.handler(args);
}

module.exports = { getToolDefinitions, executeTool, tools };
