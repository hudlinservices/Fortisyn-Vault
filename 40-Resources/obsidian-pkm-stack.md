---
title: "Obsidian & the Knowledge-Management Stack"
category: "concept"
tags:
  - obsidian
  - pkm
  - markdown
  - tooling
  - knowledge-management
date: "2026-06-20"
source: "Vault synthesis (CLAUDE.md tech stack, linking-guide, search-config, templates/, my-brain project page) + WebSearch on Obsidian/PKM 2026. NotebookLM auth unavailable this run (5th consecutive cron failure — credential, not protocol; see [[40-Resources/model-context-protocol|MCP]])."
---
# Obsidian & the Knowledge-Management Stack

**Obsidian** is the desktop application this vault physically runs in. It is named in the CLAUDE.md tech stack and referenced across 22+ pages, but it had no page of its own — this is that page. It is the *substrate* half of Roy's "agentic personal OS": Obsidian is **where the knowledge lives**, and [[40-Resources/claude-code|Claude Code]] is **how Roy acts on it**. The two interlock — the vault is plain Markdown precisely so an external agent can read and write it without the app running.

## Why Obsidian (the design fit)

Obsidian's properties are the same ones CLAUDE.md lists as the vault's [[CLAUDE.md|key principles]] — the tool was chosen because it *is* the principle:

| Obsidian property | Vault principle it serves |
|---|---|
| **Local-first** — notes are plain `.md` files on disk, no vendor lock-in, works offline | Principle #5 *Local-First, Sync-Second* |
| **Markdown / text-first** — every note is a portable text file | Principle #2 *Text-First, Tool-Augmented* |
| **Bidirectional links** — `[[wikilink]]` creates a backlink on the target page automatically | Principle #4 *Compose, Don't Duplicate* (pages linked, never copied) |
| **Plugin-extensible** — community plugins wrap behavior around the files | Principle #2 (tools wrap around the text) |

Because everything is text on disk, the vault is readable by *any* LLM with filesystem access — not just Obsidian. That is the whole bet of [[40-Resources/llm_wiki|the LLM-wiki methodology]] and [[40-Resources/three-layer-architecture|the three-layer architecture]]: the app is a convenience layer, not a dependency.

## The Four-Plugin Stack

CLAUDE.md pins four community plugins. Each one is a small tool wrapped around the Markdown:

| Plugin | What it does | Where the vault uses it |
|---|---|---|
| **Templater** | Templating engine — inserts dated, structured scaffolds with dynamic fields | [[90-System/templates/daily-note\|daily notes]], [[90-System/templates/project-hub\|project hubs]], [[90-System/templates/weekly-review\|weekly reviews]], [[90-System/templates/skill-template\|skills]] |
| **Dataview** | Queries notes like a database — dynamic tables/lists from frontmatter | Project rollups, agent-activity views on [[00-Dashboard/Home\|Home]]. ⚠️ Dataview blocks are invisible to a plain-text LLM read — the vault convention is to add a plain-text link list below each query block (see [[90-System/linking-guide\|linking guide]]). |
| **QuickAdd** | One-keystroke capture into the [[CLAUDE.md\|Inbox]] | Principle #1 *Frictionless Capture* — "any thought in under 10 seconds" |
| **Shell Commands** | Runs shell scripts from inside Obsidian | Triggers the [[40-Resources/agentic-orchestration\|agent runtime]] and [[40-Resources/index-log-pattern\|index/log]] maintenance from the editor |

## The Dataview Caveat (a recurring vault rule)

Dataview is the one plugin whose output an external LLM **cannot see** — a `dataview` code block renders to a table inside Obsidian but reads as inert source text to anything else. Since this vault's entire premise is LLM-readability, the standing rule (codified in the scout/lint workflows) is: **every Dataview block gets a plain-text wikilink list beneath it.** This is why the vault stays useful whether you open it in Obsidian, in `cat`, or through Claude Code.

## 2026 Context

Obsidian remains the reference local-first PKM tool in 2026; the must-have plugin lists still center on Dataview + Templater + QuickAdd. The emerging 2026 pattern is **agentic PKM** — running an LLM (local GraphRAG, or a CLI agent like Claude Code) directly over the Markdown vault rather than inside the app. This vault is an early instance of exactly that pattern: the app is for humans, the files are for agents.

## Related

- [[40-Resources/claude-code|Claude Code]] — the action half of the same workbench
- [[40-Resources/llm_wiki|LLM Wiki Methodology]]
- [[40-Resources/three-layer-architecture|Three-Layer Architecture]]
- [[40-Resources/rag-vs-wiki|RAG vs Wiki Knowledge]]
- [[40-Resources/index-log-pattern|Index and Log Pattern]]
- [[90-System/linking-guide|Bidirectional Linking Guide]]
- [[90-System/search-config|Search Configuration]]
- [[10-Projects/pythonslayers/my-brain|Fortisyn Vault]]

## Sources

- [What Is Obsidian Used For? A Practical 2026 Guide — Obsibrain](https://www.obsibrain.com/blog/what-to-use-obsidian-for-in-2026)
- [The Best Obsidian Plugins for 2026 — Sébastien Dubois](https://www.dsebastien.net/the-must-have-obsidian-plugins-for-2026/)
- [Obsidian Plugins Productivity Guide 2026 — aiproductivity.ai](https://aiproductivity.ai/blog/obsidian-plugins-productivity/)
- [The 2026 Obsidian Report Card — Practical PKM](https://practicalpkm.com/2026-obsidian-report-card/)
- [Agentic PKM Patterns — GitHub gist](https://gist.github.com/MarkBruns/469e193ab090ce1ff3f70fc2d08ad1f6)
