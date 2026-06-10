---
title: "Three-Layer Architecture"
category: "concept"
tags:
  - concept
  - architecture
  - knowledge-management
  - methodology
date: "2026-06-09"
source: "[[raw/2026-06-09 - LLM Wiki Methodology]]"
---
# Three-Layer Architecture

The architecture that makes the LLM Wiki pattern work. Three distinct layers with clear ownership boundaries.

## Layer 1: Raw Sources

**Your curated collection of source documents.** Articles, papers, images, data files — anything you want the wiki to absorb.

Properties:
- **Immutable** — the LLM reads from here but never modifies files here
- **Source of truth** — if the wiki contradicts a source, the source wins
- **Chronological** — files named `YYYY-MM-DD - Description.ext`
- **Human-curated** — you decide what goes in

Location: `raw/`

## Layer 2: The Wiki

**A directory of LLM-generated and LLM-maintained markdown files.** Summaries, entity pages, concept pages, comparisons, overviews, synthesis.

Properties:
- **LLM-owned** — the LLM creates and maintains all pages
- **Interlinked** — every page links to related pages
- **Compounding** — gets richer with every source and every query
- **Human-read** — you browse it in Obsidian; the LLM writes it

Location: `00-Dashboard/`, `10-Projects/`, `20-Skills/`, `30-Automations/`, `40-Resources/`, `90-System/`, `Inbox/`

## Layer 3: The Schema

**A document that tells the LLM how the wiki is structured, what conventions to follow, and what workflows to use.**

Properties:
- **Co-evolved** — you and the LLM improve it over time as you figure out what works
- **The operating manual** — turns a generic LLM into a disciplined wiki maintainer
- **Self-referential** — the schema itself is a wiki page

Location: `CLAUDE.md`

## How they interact

```
Raw Sources (immutable)
    ↓  LLM reads
The Wiki (LLM-maintained)
    ↑  Schema tells LLM how
CLAUDE.md (co-evolved)
```

1. Human drops a source in `raw/`
2. Human says "ingest this"
3. LLM reads the schema (CLAUDE.md) to understand the workflow
4. LLM reads the source from `raw/`
5. LLM creates/updates pages in the wiki layer
6. LLM updates `index.md` and `log.md`

The schema is the key — it's what makes the LLM a disciplined wiki maintainer rather than a generic chatbot. Without it, the LLM doesn't know the conventions, the workflows, or the page structure. With it, every session picks up where the last one left off.

## See also

- [[40-Resources/rag-vs-wiki|RAG vs Wiki Knowledge]] — why this architecture beats RAG over time
- [[40-Resources/wiki-operations|Wiki Operations]] — the workflows that drive each layer
- [[40-Resources/llm_wiki|LLM Wiki]] — the original methodology document
