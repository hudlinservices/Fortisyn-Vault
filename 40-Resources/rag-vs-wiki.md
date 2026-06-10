---
title: "RAG vs Wiki Knowledge"
category: "comparison"
tags:
  - comparison
  - knowledge-management
  - rag
  - wiki
  - methodology
date: "2026-06-09"
source: "[[raw/2026-06-09 - LLM Wiki Methodology]]"
---
# RAG vs Wiki Knowledge

Two fundamentally different approaches to using LLMs with documents.

## RAG: Rediscovery Every Time

Most people's experience with LLMs and documents looks like RAG (Retrieval-Augmented Generation):

1. Upload a collection of files
2. The LLM retrieves relevant chunks at query time
3. The LLM generates an answer from those chunks

**The problem:** The LLM is rediscovering knowledge from scratch on every question. There's no accumulation. Ask a subtle question that requires synthesizing five documents, and the LLM has to find and piece together the relevant fragments every time. Nothing is built up.

Products using this pattern: NotebookLM, ChatGPT file uploads, most RAG systems.

## Wiki: Compounding Knowledge

Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources.

When you add a new source, the LLM doesn't just index it. It reads it, extracts the key information, and integrates it into the existing wiki — updating entity pages, revising topic summaries, noting where new data contradicts old claims, strengthening or challenging the evolving synthesis.

**The key difference:** The wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read. The wiki keeps getting richer with every source you add and every question you ask.

## Comparison

| Dimension | RAG | Wiki |
|---|---|---|
| Knowledge state | Re-derived per query | Persists and compounds |
| Cross-references | None between chunks | Built into every page |
| Contradictions | Undetected | Flagged on ingest |
| Synthesis | Shallow, per-query | Deep, cumulative |
| Maintenance cost | Zero (but zero depth) | Near-zero (LLM does it) |
| Query quality | Good for simple lookups | Excellent for complex synthesis |

## Why RAG wins short-term, Wiki wins long-term

RAG is easier to set up — dump files in, ask questions. No maintenance. But the ceiling is low: you can only get as much out as the retrieval can find in one pass.

Wiki takes more upfront investment — the LLM has to process each source, create pages, maintain cross-references. But the returns compound. After 50 sources, the wiki has hundreds of interlinked pages. A query that would require finding and synthesizing 10 documents in RAG just reads 3 wiki pages that already have the synthesis built in.

## See also

- [[40-Resources/three-layer-architecture|Three-Layer Architecture]] — the architecture that makes this work
- [[40-Resources/wiki-operations|Wiki Operations]] — ingest, query, lint
- [[40-Resources/llm_wiki|LLM Wiki]] — the original methodology document
