---
name: "Agent Integration Test"
domain: "admin"
prerequisites:
  - "Node.js >= 18"
  - "ANTHROPIC_API_KEY set"
  - "npm install run in 90-System/agents/"
estimated_time: "2 minutes"
tools:
  - "run-agent.js"
agent_executable: true
agent_steps: [1, 2, 3]
tags:
  - skill
  - admin
  - test
version: 1
last_updated: "2026-05-18"
---

# Agent Integration Test

## Purpose

Verify the agent infrastructure works end-to-end: agent loads, plans, executes tool calls, writes run log, and exits correctly.

## Prerequisites

- [ ] `ANTHROPIC_API_KEY` environment variable set
- [ ] `npm install` completed in `90-System/agents/`

## Steps

1. `[agent]` Read this skill template to understand the test
2. `[agent]` Create a test file at `Inbox/agent-test-output.md` with the content: `# Agent Test\n\nAgent integration test passed at {{timestamp}}`
3. `[agent]` Write a final summary to the run log confirming the test passed

## Expected Outputs

- `Inbox/agent-test-output.md` created with test output
- Agent run log in `30-Automations/logs/` with all step checkpoints
- Agent exits with code 0

## Tools & Automations

- `90-System/agents/run-agent.js`

## Notes & Tips

Run this test after any changes to the agent infrastructure to verify nothing is broken.

```bash
# Run the test
node 90-System/agents/run-agent.js \
  --agent-def "90-System/agents/content-agent.md" \
  --outcome "Run the agent integration test skill at 20-Skills/admin/agent-test-skill.md. Follow the steps exactly and report completion."
```
