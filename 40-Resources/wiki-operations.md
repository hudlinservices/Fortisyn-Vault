---
title: "Wiki Operations"
category: "concept"
tags:
  - concept
  - operations
  - workflow
  - methodology
date: "2026-06-09"
source: "[[raw/2026-06-09 - LLM Wiki Methodology]]"
---
# Wiki Operations

The three maintenance operations that keep the wiki alive: ingest, query, and lint. Each has a defined workflow documented in the [[CLAUDE.md|schema]].

## Ingest

**Trigger:** Human drops a source into `raw/` and says "ingest this."

The LLM reads the source, discusses key takeaways with the human, then integrates the knowledge into the wiki:

1. Read the source
2. Discuss key takeaways with the human
3. Create/update wiki pages — summary page, entity pages, concept pages
4. Update related pages with new cross-references
5. Update `index.md`
6. Append to `log.md`

A single source should touch 5-15 wiki pages. The goal is synthesis, not just summarization.

**Human's role:** Curate sources, guide emphasis, verify accuracy. The LLM does the grunt work.

## Query

**Trigger:** Human asks a question against the wiki.

The LLM searches for relevant pages, reads them, and synthesizes an answer with citations:

1. Read `index.md` — find relevant pages by category
2. Read `log.md` — check recent activity
3. Read relevant pages
4. Synthesize answer with wikilink citations
5. Offer to file the answer back as a new wiki page

**The important insight:** Good answers can be filed back into the wiki as new pages. A comparison you asked for, an analysis, a connection you discovered — these are valuable and shouldn't disappear into chat history. This way explorations compound just like ingested sources do.

## Lint

**Trigger:** Human says "lint the wiki" (run weekly).

The LLM health-checks the wiki for quality issues:

| Check | What to look for |
|---|---|
| Contradictions | Pages making conflicting claims about the same thing |
| Stale claims | Content that newer sources have superseded |
| Orphan pages | Pages with no inbound links |
| Missing pages | Concepts mentioned but lacking their own page |
| Broken links | Wikilinks pointing to non-existent pages |
| Missing cross-refs | Pages that should link but don't |
| Data gaps | Claims that could be strengthened with research |
| Frontmatter hygiene | Missing or malformed frontmatter |

File findings to `Inbox/lint-YYYY-MM-DD.md` and append to `log.md`.

**The LLM is good at suggesting what to investigate next and what sources to look for.** This keeps the wiki healthy as it grows.

## Rhythm

| Frequency | Operation |
|---|---|
| Per source | Ingest |
| Per question | Query |
| Weekly | Lint |
| Continuous | Cross-reference maintenance (every ingest touches related pages) |

## See also

- [[40-Resources/three-layer-architecture|Three-Layer Architecture]] — where these operations fit
- [[40-Resources/rag-vs-wiki|RAG vs Wiki Knowledge]] — why operations matter
- [[40-Resources/index-log-pattern|Index and Log Pattern]] — the navigation files operations depend on
- [[40-Resources/llm_wiki|LLM Wiki]] — the original methodology document
