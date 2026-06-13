---
name: "Fortisyn Vault"
status: "active"
priority: "P1"
corporate_entity: "[[_corporate-hub|Python Slayers]]"
path: "/home/projects/pythonslayers/fortisyn-vault"
deadline: ""
goals:
  - "Agentic personal OS — delegate outcomes, agents execute"
  - "Central knowledge hub for all corporate entities and projects"
tags:
  - project
  - pythonslayers
  - obsidian
  - ai-agents
  - knowledge-management
created: "2026-05-18"
updated: "2026-06-09"
---

# Fortisyn Vault

**This vault.** The agentic personal OS — home dashboard, skill templates, AI agents, knowledge capture, and project memory for all of Fortisyn.

## Overview

An agentic personal operating system built on Obsidian. Delegate outcomes to AI agents that plan, execute, and report back. The vault is the single source of truth — projects, skills, automations, agents, and knowledge all in one place.

## Goals

- [x] Home dashboard with daily priorities, projects, agent activity
- [x] Quick capture under 10 seconds
- [x] Skill templates for recurring tasks (human + agent steps)
- [x] AI agent framework (Claude-powered, tool-using, decision-gated)
- [x] Weekly review with human/agent productivity split
- [x] Corporate alignment — all Fortisyn entities and projects tracked
- [ ] Daily active use — morning ignition, captures, agent delegation
- [ ] Automate first real task end-to-end via agent

## Structure

```
fortisyn-vault/
├── 00-Dashboard/    ← Home, daily notes, weekly reviews
├── 10-Projects/     ← Corporate entities → project hubs
├── 20-Skills/       ← Reusable skill templates by domain
├── 30-Automations/  ← Pipeline scripts + agent run logs
├── 40-Resources/    ← Reference materials, MOCs
├── 90-System/       ← Templates, agent definitions, runtime
└── Inbox/           ← Quick-capture staging
```

## Agent Delegations

```dataview
TABLE WITHOUT ID
  file.link AS "Run Log",
  status AS "Status",
  delegated_outcome AS "Delegated Outcome"
FROM "30-Automations/logs"
WHERE contains(file.frontmatter.project, "my-brain")
SORT start_time DESC
```

## Skills Used

- [[20-Skills/admin/capture-daily-notes|Capture Daily Notes]]
- [[20-Skills/content-creation/publish-blog-post|Publish Blog Post]]
- [[20-Skills/marketing/product-launch|Product Launch Routine]]

## Notes

### 2026-05-18
- Vault infrastructure complete (57 tasks implemented)
- 4 Obsidian plugins installed (Templater, Dataview, QuickAdd, Shell Commands)
- 2 agents defined (Content Agent, Marketing Agent)
- Corporate alignment in progress — mapping all 13 entities
