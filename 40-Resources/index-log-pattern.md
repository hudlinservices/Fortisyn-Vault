---
title: "Index and Log Pattern"
category: "concept"
tags:
  - concept
  - navigation
  - indexing
  - logging
  - methodology
date: "2026-06-09"
source: "[[raw/2026-06-09 - LLM Wiki Methodology]]"
---
# Index and Log Pattern

Two special files that help the LLM (and you) navigate the wiki as it grows. They serve different purposes and are the first two files any LLM reads when entering the vault.

## index.md — Content-Oriented

**A catalog of everything in the wiki.** Each page listed with a link, a one-line summary, and optionally metadata like date or source count. Organized by category.

Purpose:
- First file the LLM reads on any query — finds relevant pages without scanning the whole vault
- Updated on every ingest when new pages are created
- Works surprisingly well at moderate scale (~100 sources, ~hundreds of pages)
- Avoids the need for embedding-based RAG infrastructure

Location: `index.md` (vault root)

## log.md — Time-Oriented

**An append-only record of what happened and when.** Ingestions, queries, lint passes, merges, structural changes.

Format: `## [YYYY-MM-DD] type | Description`

Types: `ingest`, `query`, `lint`, `merge`, `setup`, `auto`, `agent`

Purpose:
- Gives the LLM a timeline of the wiki's evolution
- Helps the LLM understand what's been done recently without reading the whole vault
- Parseable with simple unix tools: `grep "^## \[" log.md | tail -5` gives the last 5 entries

Location: `log.md` (vault root)

## How they work together

| File | Question it answers | Updated by |
|---|---|---|
| `index.md` | "What pages exist about X?" | Ingest workflow |
| `log.md` | "What happened recently?" | Ingest, query, lint workflows |

When the LLM enters the vault:
1. Read `index.md` → know what's here
2. Read `log.md` → know what's recent
3. Now you're oriented — proceed with the task

## Scale characteristics

At small scale (< 50 pages): `index.md` is a convenience, not a necessity. The LLM could scan everything.

At medium scale (50-500 pages): `index.md` becomes essential. Without it, every query starts with a blind search.

At large scale (500+ pages): `index.md` plus a search tool like [qmd](https://github.com/tobi/qmd) — hybrid BM25/vector search with LLM re-ranking, all on-device. The index remains the primary entry point; search handles deep dives.

## See also

- [[40-Resources/wiki-operations|Wiki Operations]] — the workflows that read and update these files
- [[40-Resources/three-layer-architecture|Three-Layer Architecture]] — where these files fit
- [[40-Resources/llm_wiki|LLM Wiki]] — the original methodology document
