# My Brain — Agentic Personal OS

An agentic personal operating system built on Obsidian. Delegate outcomes to AI agents that plan, execute, and report back. The vault is your single source of truth — projects, skills, automations, and knowledge all in one place.

## Quick Start

1. Open this folder as an Obsidian vault
2. Enable community plugins (Templater, Dataview, QuickAdd, Shell Commands)
3. Press `Cmd+Shift+C` to quick-capture a thought
4. Press `Cmd+Shift+T` to create today's daily note
5. Open `00-Dashboard/Home.md` to see your daily dashboard

## Folder Map

```
00-Dashboard/    → Home dashboard, daily notes, weekly reviews
10-Projects/     → One hub note per project (goals, tasks, decisions)
20-Skills/       → Reusable skill templates, grouped by domain
30-Automations/  → Pipeline scripts and run logs
40-Resources/    → Reference materials and MOCs
90-System/       → Templates, agent definitions, agent runtime
Inbox/           → Quick-capture staging
```

## Daily Workflow

1. **Morning**: Open Obsidian → Home dashboard shows priorities, agent activity, captures
2. **During Day**: Quick capture thoughts (`Cmd+Shift+C`), execute skill templates, delegate to agents
3. **End of Day**: Fill end-of-day reflection in daily note, set tomorrow's priorities
4. **Weekly**: Run weekly review template to audit progress (human + agent)

## Agent Delegation

```bash
# Delegate a task
node 90-System/agents/run-agent.js \
  --agent-def "90-System/agents/content-agent.md" \
  --outcome "Create and publish this week's newsletter about topic X"

# Resume after reviewing a decision
node 90-System/agents/run-agent.js \
  --agent-def "90-System/agents/content-agent.md" \
  --resume --run-log "30-Automations/logs/2026-05-18-content-agent-newsletter.md"
```

## More Info

- Full plan: `specs/001-personal-os-infra/plan.md`
- Quickstart guide: `specs/001-personal-os-infra/quickstart.md`
- Architecture: `specs/001-personal-os-infra/plan.md`
