---
title: "Claude Code & AI-Assisted Development"
category: "concept"
tags:
  - claude-code
  - anthropic
  - ai-development
  - tooling
  - agentic
date: "2026-06-20"
source: "Vault synthesis (agentic-orchestration runtime, MCP page, chatgpt-conversations claude-code-deepseek-setup / install-claude-code-vscode, CLAUDE.md) + WebSearch on Claude Code 2026. NotebookLM auth unavailable this run (5th consecutive cron failure)."
---
# Claude Code & AI-Assisted Development

**Claude Code** is Anthropic's agentic coding tool — an LLM that runs in the terminal (also VS Code, desktop, and web), reads an entire codebase, plans a change, edits across many files, runs tests, and commits. It is named across 5+ vault pages and in the ChatGPT export history (*Claude Code DeepSeek setup*, *Install Claude Code VS Code*), but had no page of its own. This is that page.

It is the **action half** of Roy's "agentic personal OS": [[40-Resources/obsidian-pkm-stack|Obsidian]] is where the knowledge lives; **Claude Code is how Roy acts on it.** This very scout run — reading the vault, researching gaps, writing pages, committing to git — is Claude Code executing the [[20-Skills/research/knowledge-scout|Knowledge Scout]] workflow.

## What it is

- An **agentic CLI** built by Anthropic: natural-language instructions in, multi-file code changes + test runs + git commits out.
- Runs everywhere: **CLI, VS Code extension, desktop app, web app.** Roy's setup is documented in the export conversations (VS Code install + a DeepSeek-backed variant).
- Reads the *whole* project and reasons about file relationships before acting — not autocomplete, but a planning agent.
- One of the most widely adopted AI coding tools in 2026 (~101k GitHub stars).

## How it fits the vault's agentic stack

Claude Code is the third leg of the trilogy the vault documented across runs #10–#11:

| Layer | Page | Role |
|---|---|---|
| **The orchestration model** | [[40-Resources/agentic-orchestration\|Agentic Orchestration & Agent Runtime]] | the loop, the three gates (creative/destructive/ambiguous), locking, resumable run logs |
| **The integration layer** | [[40-Resources/model-context-protocol\|Model Context Protocol]] | how an agent reaches tools (NotebookLM, Obsidian, Buffer) over MCP |
| **The agent itself** | **Claude Code** (this page) | the host that runs the loop and speaks MCP |

Claude Code is an **MCP host** — it connects to MCP servers like [[10-Projects/pythonslayers/OneClickLM|OneClickLM]] (NotebookLM) and the Obsidian/Buffer servers, which is exactly the host/client/server model on the [[40-Resources/model-context-protocol|MCP page]]. The vault's home-grown DeepSeek runtime (run-agent.js, gates.js — see [[40-Resources/agentic-orchestration|agentic orchestration]]) is the *bespoke* version of the same idea; Claude Code is the off-the-shelf, far more capable version Roy uses for real development and vault maintenance.

> ⚠️ Two distinct "agent" systems coexist in this vault, and they should not be conflated: (1) the **custom Node.js + DeepSeek runtime** in `90-System/agents/` that the [[90-System/agents/Agent-Registry|Agent Registry]] describes, and (2) **Claude Code**, the Anthropic tool that runs the scout/lint/ingest workflows defined in CLAUDE.md. The custom runtime was the early experiment; Claude Code is what actually executes the autonomous cron runs today.

## 2026 capabilities worth noting

- **Sub-agents / Agent Teams** — a lead agent decomposes a task and delegates independent workstreams (backend, frontend, docs) to parallel instances, then merges. Directly relevant to the vault's multi-agent ambitions.
- **`/fork`** — git-style branching of a session to explore alternatives.
- **Plugin search, smarter model/region handling, nested sub-agents** — shipped in 2026 updates.

## Where Roy uses it

- Building and maintaining every Fortisyn software project — [[40-Resources/django-platform-architecture|the Django platform]], [[10-Projects/pythonslayers/_corporate-hub|Python Slayers]] apps, [[10-Projects/innovatience/accounting|Chart of Accounts Pro]].
- Running this vault's autonomous workflows: scout, lint, ingest (CLAUDE.md).
- The [[40-Resources/sff-llm-build|SFF LLM Machine]] is the hardware angle — a portable rig to run capable models (including local ones) wherever Roy is, including [[40-Resources/costa-rica|Costa Rica]].

## Related

- [[40-Resources/obsidian-pkm-stack|Obsidian & the Knowledge-Management Stack]] — the knowledge half of the workbench
- [[40-Resources/agentic-orchestration|Agentic Orchestration & Agent Runtime]]
- [[40-Resources/model-context-protocol|Model Context Protocol (MCP)]]
- [[10-Projects/pythonslayers/OneClickLM|OneClickLM]]
- [[40-Resources/sff-llm-build|SFF LLM Machine]]

## Sources

- [Claude Code: The Complete 2026 Guide — Medium](https://medium.com/@2315610426/claude-code-the-complete-2026-guide-to-anthropics-agentic-coding-tool-cde4e565725b)
- [Claude AI in 2026: Complete Guide — StartupHub.ai](https://www.startuphub.ai/ai-news/reviews/2026/claude-ai-complete-guide-2026)
- [Code with Claude 2026: New Agent Features — MindStudio](https://www.mindstudio.ai/blog/code-with-claude-2026-new-agent-features)
- [Claude Code Adds a '/fork' Command — TechTimes](https://www.techtimes.com/articles/318344/20260613/claude-code-adds--fork-command-anthropic-brings-git-style-branching-ai-coding-sessions.htm)
- Vault exports: `chatgpt-conversations/claude-code-deepseek-setup`, `chatgpt-conversations/install-claude-code-vscode`
