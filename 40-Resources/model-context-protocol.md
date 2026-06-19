---
title: "Model Context Protocol (MCP)"
category: "concept"
tags:
  - mcp
  - agents
  - integration
  - anthropic
  - protocol
date: "2026-06-19"
source: "WebSearch/WebFetch — Anthropic (modelcontextprotocol announcement), LogRocket, Phil Schmid, MCP Cheat Sheet 2026"
---
# Model Context Protocol (MCP)

The open standard that lets AI models reach external tools and data through a single, uniform interface. MCP is the integration layer of this entire agentic OS — it's *how* every agent in the vault touches the outside world, and it's a product Fortisyn ships ([[10-Projects/pythonslayers/OneClickLM|OneClickLM]]).

## What It Is

MCP is an open-source, open standard introduced by **Anthropic in November 2024** for building secure, two-way connections between AI applications and external data sources or tools. Instead of every AI app writing a bespoke integration for every service ("M×N" connectors), MCP defines one protocol so any compliant client can talk to any compliant server ("M+N"). It's often described as "USB-C for AI tools."

## Architecture

MCP has a three-part architecture:

| Component | Role | Example here |
|-----------|------|--------------|
| **Host** | The AI application that wants tool access | Claude Code / Claude Desktop running a scout or agent |
| **Client** | Lives inside the host; manages the connection to *one* server | The MCP client Claude Code spins up per server |
| **Server** | External program exposing capabilities over a standard API | [[10-Projects/pythonslayers/OneClickLM|OneClickLM]] (NotebookLM), Obsidian server, Buffer server |

Communication uses structured **JSON-RPC** messages: the client requests capabilities, the server advertises and executes them.

## Three Core Primitives

- **Tools** (model-controlled) — functions the model can invoke (e.g. `notebook_query`, `source_add`, `write_note`). The model decides when to call them.
- **Resources** (app-controlled) — data/context the host can pull in (files, records).
- **Prompts** (user-controlled) — reusable prompt templates the user can trigger.

The vault's own agent runtime (`90-System/agents/tools.js`) mirrors this idea with its own tool registry (`read_file`, `write_file`, `run_script`, `search_vault`, `surface_decision`) — a hand-rolled, in-process version of what MCP standardizes across the network. See [[40-Resources/agentic-orchestration|Agentic Orchestration]].

## MCP in This Vault

MCP is everywhere in the Fortisyn agentic OS, in two directions:

**As a consumer** — the scout and agents reach tools over MCP:
- **NotebookLM** via [[10-Projects/pythonslayers/OneClickLM|OneClickLM]] (`notebook_list/create/query`, `source_add/list`) — the [[20-Skills/research/knowledge-scout|Knowledge Scout]]'s research path.
- **Obsidian** server — `read_note`, `write_note`, `search_notes` over the vault.
- **Buffer** — the [[90-System/agents/auron-agent|Auron Agent]] and [[90-System/agents/social-media-agent|Social Media Agent]] queue posts via a Buffer MCP integration.

**As a producer** — [[10-Projects/pythonslayers/OneClickLM|OneClickLM]] is a *published* MCP server Fortisyn built: TypeScript, `@modelcontextprotocol/sdk`, auto-healing Google auth, speaking Google's internal `batchexecute` RPC. It exposes 6 MCP tools and is targeted at npm + the Smithery / awesome-mcp-servers registries. This is Python Slayers turning the vault's own tooling need into a shippable product.

> Note: OneClickLM's auth has failed on every recent cron scout run (NotebookLM `No cookies found`, 4 consecutive: 2026-06-15/-16/-17/-19). This is a *credential* problem (needs `npx oneclicklm login`), not an MCP-protocol problem — the scout falls back to WebSearch/WebFetch. See [[20-Skills/research/knowledge-scout|Knowledge Scout]] prerequisites.

## Why It Matters to Fortisyn

- **Compounding tooling** — each new MCP server (NotebookLM, Obsidian, Buffer) is reusable by *every* agent, not just one. Build once, every agent benefits.
- **A product line** — OneClickLM proves Python Slayers can package internal tooling as open-source MCP servers for the broader ecosystem.
- **Standard surface for gates** — because tool calls are uniform JSON-RPC, the runtime can intercept any of them at a [[40-Resources/agentic-orchestration|decision gate]] before execution.

## Sources

- [Introducing the Model Context Protocol — Anthropic](https://www.anthropic.com/news/model-context-protocol)
- [Understanding Anthropic's Model Context Protocol — LogRocket](https://blog.logrocket.com/understanding-anthropic-model-context-protocol-mcp/)
- [Model Context Protocol: an overview — Phil Schmid](https://www.philschmid.de/mcp-introduction)
- [MCP Cheat Sheet (2026) — Webfuse](https://www.webfuse.com/mcp-cheat-sheet)
- Vault: [[10-Projects/pythonslayers/OneClickLM|OneClickLM]], `90-System/agents/tools.js`

## Related

- [[10-Projects/pythonslayers/OneClickLM|OneClickLM]] — Fortisyn's MCP server
- [[40-Resources/agentic-orchestration|Agentic Orchestration]] — how agents use these tools with gates
- [[20-Skills/research/knowledge-scout|Knowledge Scout]] — primary MCP consumer
- [[90-System/agents/Agent-Registry|Agent Registry]]
- [[40-Resources/cloud-deployment-infrastructure|Cloud Deployment & Hosting]]
