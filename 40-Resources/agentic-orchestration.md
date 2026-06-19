---
title: "Agentic Orchestration & Agent Runtime"
category: "concept"
tags:
  - agents
  - orchestration
  - runtime
  - automation
  - human-in-the-loop
date: "2026-06-19"
source: "Vault runtime (90-System/agents/*.js) + WebSearch — monday.com, Strata, Knowlee AI agent orchestration guides (2026)"
---
# Agentic Orchestration & Agent Runtime

How the vault actually *runs* agents. CLAUDE.md's principle #6 — **"Agentic Orchestration with Human Guardrails: agents execute autonomously; pause at creative, destructive, and ambiguous gates"** — is not a slogan; it's implemented in ~5 Node.js files under `90-System/agents/`. This page documents that runtime and connects it to the broader 2026 orchestration practice it instantiates.

## The Runtime, File by File

| File | Role |
|------|------|
| [[90-System/agents/run-agent.js\|run-agent.js]] | Entry point + the agent loop. CLI: `--agent-def`, `--outcome`, `--project`, `--resume`. |
| [[90-System/agents/tools.js\|tools.js]] | The tool registry agents can call (`read_file`, `write_file`, `run_script`, `search_vault`, `surface_decision`). |
| [[90-System/agents/gates.js\|gates.js]] | The three-gate decision model — intercepts risky actions before they run. |
| [[90-System/agents/lock.js\|lock.js]] | Per-run lock so two invocations can't corrupt the same run log. |
| [[90-System/agents/run-log.js\|run-log.js]] | Run-log read/write/frontmatter parsing — the durable execution record. |

**The loop** (`run-agent.js`): load the agent definition's frontmatter + `## System Prompt`, assemble it with the tool list and the agent's `confirmation_gates`, then run a bounded tool-calling loop against the model. Each turn the model either calls a tool (checked against the gates, then executed, result fed back) or emits text. On "task complete" it exits 0; on a gate it surfaces a decision and exits 2; on an unrecoverable error it exits 1.

> Model note: the runtime is wired to **DeepSeek** via the OpenAI-compatible SDK (`baseURL: api.deepseek.com`, `DEEPSEEK_API_KEY`), with `model_preference` per agent. This is distinct from the *interactive* scout/lint sessions, which run on Claude. Two different execution surfaces share one vault.

## The Three-Gate Model

The heart of "human guardrails." `gates.js` classifies any action into one of three gate types — exactly the **human-in-the-loop (HITL) approval gate** pattern that 2026 orchestration guidance prescribes for "any irreversible or high-value action":

1. **Creative** — options exist and a human should choose (headline, title, design option, "choose between…"). The agent generates options, then stops.
2. **Destructive** — `publish` / `spend_money` / `modify_file`. Regex-matched against the action *and* checked at the tool layer: e.g. `write_file` in `create` mode is free, appends to `Inbox/` or `30-Automations/logs/` are free, small (<3 KB) appends are free, but overwriting or large modifications gate.
3. **Ambiguous** — errors that need a human: permission denied, auth failure, not-found, timeout, rate limit, invalid credentials.

When a gate triggers, the agent calls `surface_decision` → writes an `[AWAITING_DECISION]` block (with typed options A/B/C) into the run log, sets `status: awaiting_decision`, releases the lock, and **exits with code 2**. A human edits the run log with their choice; re-invoking with `--resume` continues from the last completed step. This is the vault's version of an "intentional interrupt within the orchestration graph."

## Guardrails Beyond Gates

- **Bounded autonomy** — `MAX_TURNS` (default 20, or `max_autonomous_steps × 2`) caps a runaway loop; hitting it surfaces an ambiguous decision rather than spinning.
- **Locking** — `acquireLock`/`releaseLock` prevent concurrent corruption of a run log.
- **Durable, auditable run logs** — every step, tool call, and decision is appended to a dated run log in `30-Automations/logs/` with status frontmatter. This is the "immutable audit trail" 2026 enterprise/EU-AI-Act guidance calls for, in markdown form.
- **Resumability** — exit-code-2 + `--resume` makes long tasks survivable across human review without losing state.

## The Agents

Defined under `90-System/agents/`, registered in [[90-System/agents/Agent-Registry|Agent Registry]]:

- [[90-System/agents/content-agent|Content Agent]] — file creation, editing, research.
- [[90-System/agents/marketing-agent|Marketing Agent]] — cross-entity surveys, status reports.
- [[90-System/agents/knowledge-scout-agent|Knowledge Scout Agent]] — autonomous gap-finding + research (this very workflow).
- [[90-System/agents/auron-agent|Auron Agent]] — posts to Instagram/LinkedIn/YouTube via Buffer for 6 brands.
- [[90-System/agents/social-media-agent|Social Media Agent]] — MindTechArt-voice content, human approval gate.
- [[90-System/agents/agent-template|Agent Template]] — scaffold for new agents.

Each agent declares its `confirmation_gates`, `allowed_skills` (loaded as skill templates into the system prompt), and `model_preference` in frontmatter — so autonomy and guardrails are configured *per agent*, declaratively.

## How It Connects

- **Tools** — the runtime's in-process tool registry (`tools.js`) is a hand-rolled cousin of the networked [[40-Resources/model-context-protocol|Model Context Protocol]]. Interactive agents reach NotebookLM/Obsidian/Buffer over MCP; the DeepSeek runtime uses these five local tools. Both share the "model calls typed functions, host mediates" shape.
- **Skills** — agents execute [[20-Skills/Skill-Registry|skills]]; the [[20-Skills/research/knowledge-scout|Knowledge Scout]] skill is the most-exercised, running this autonomous research loop on a cron.
- **Cron** — scout/ingest run unattended (see `30-Automations/logs/cron-*`), which is *why* the gate model matters: with no human present, destructive/creative/ambiguous actions must self-pause rather than guess. Autonomous cron runs record their gap-selection rationale in [[log|log.md]] in lieu of the human approval gate.

## 2026 Context

External orchestration practice has converged on what this runtime already does: **sequential** step-by-step execution with **HITL gates before external communication, financial changes, and escalations**, plus immutable audit logs. Industry guidance notes a human can supervise only ~2-3 agents without good operator surfaces but 10-20 with a kanban/alert system and well-placed checkpoints — a reminder that the run-log + decision-surfacing surface is what would let Fortisyn scale past a handful of agents. The EU AI Act (enforceable August 2026) makes HITL oversight and audit trails a legal requirement for high-impact agentic systems, not just a best practice.

## Sources

- Vault runtime: `90-System/agents/run-agent.js`, `gates.js`, `tools.js`, `lock.js`, `run-log.js`
- CLAUDE.md — principle #6, Agentic Orchestration with Human Guardrails
- [AI agent orchestration: what it is and why it matters in 2026 — monday.com](https://monday.com/blog/ai-agents/ai-agent-orchestration/)
- [Human-in-the-Loop: A 2026 Guide to AI Oversight — Strata](https://www.strata.io/blog/agentic-identity/practicing-the-human-in-the-loop/)
- [AI Agent Orchestration Guide 2026: Patterns, Code, and Ops — Knowlee](https://www.knowlee.ai/blog/ai-agent-orchestration-guide-2026)

## Related

- [[90-System/agents/Agent-Registry|Agent Registry]] — all agents
- [[40-Resources/model-context-protocol|Model Context Protocol]] — the networked tool layer
- [[20-Skills/research/knowledge-scout|Knowledge Scout]] — the most-run agentic loop
- [[40-Resources/unified-knowledge-graph|Unified Knowledge Graph]]
