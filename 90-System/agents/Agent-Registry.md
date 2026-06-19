---
title: "Agent Registry"
type: "moc"
tags:
  - moc
  - agent-registry
updated: "2026-05-18"
---


# Agent Registry

How the runtime executes these agents — the loop, the three-gate model, locking, and resumable run logs — is documented in [[40-Resources/agentic-orchestration|Agentic Orchestration & Agent Runtime]].

## Active Agents

```dataview
TABLE WITHOUT ID
  file.link AS "Agent",
  description AS "Description",
  domains AS "Domains",
  model_preference AS "Model",
  version AS "Version"
FROM "90-System/agents"
WHERE tags INCLUDES "agent-definition"
SORT file.name ASC
```

## Agents by Domain

### Content Creation
```dataview
TABLE WITHOUT ID
  file.link AS "Agent",
  description AS "Description"
FROM "90-System/agents"
WHERE tags INCLUDES "agent-definition" AND contains(domains, "content-creation")
```

### Marketing
```dataview
TABLE WITHOUT ID
  file.link AS "Agent",
  description AS "Description"
FROM "90-System/agents"
WHERE tags INCLUDES "agent-definition" AND contains(domains, "marketing")
```

---

## Recent Agent Activity

```dataview
TABLE WITHOUT ID
  file.link AS "Run Log",
  agent AS "Agent",
  status AS "Status",
  start_time AS "Started"
FROM "30-Automations/logs"
WHERE tags INCLUDES "agent-run"
SORT start_time DESC
LIMIT 20
```

## Agents Awaiting Decisions

```dataview
TABLE WITHOUT ID
  file.link AS "Run Log",
  agent AS "Agent",
  project AS "Project",
  delegated_outcome AS "Task"
FROM "30-Automations/logs"
WHERE status = "awaiting_decision"
SORT start_time DESC
```

---

## Quick Launch

To delegate to an agent, use the command palette or run from terminal:

```bash
# Content Agent
node 90-System/agents/run-agent.js \
  --agent-def "90-System/agents/content-agent.md" \
  --outcome "Create and publish this week's newsletter about topic X" \
  --project "10-Projects/my-project.md"

# Marketing Agent  
node 90-System/agents/run-agent.js \
  --agent-def "90-System/agents/marketing-agent.md" \
  --outcome "Plan social media campaign for product launch" \
  --project "10-Projects/my-project.md"

# Resume an agent awaiting decision
node 90-System/agents/run-agent.js \
  --agent-def "90-System/agents/content-agent.md" \
  --resume --run-log "30-Automations/logs/2026-05-18-content-agent-newsletter.md"
```
