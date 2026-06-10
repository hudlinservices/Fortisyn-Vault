---
name: "Knowledge Scout"
domain: "research"
prerequisites:
  - "NotebookLM MCP tools available"
  - "Obsidian vault open"
estimated_time: "30 minutes per run"
tools:
  - "NotebookLM MCP (notebook_create, source_add, notebook_query, source_list)"
  - "Obsidian Read/Write/Edit"
agent_executable: true
agent_steps: [1, 3, 4, 5, 6]
tags:
  - skill
  - research
  - self-learning
version: 1
last_updated: "2026-06-09"
---
# Knowledge Scout

Autonomous research skill. Scans the vault for knowledge gaps, researches them via NotebookLM, and synthesizes findings into wiki pages. Improves its own research strategies over time.

## Purpose

Find what the vault doesn't know and fill it in. Instead of waiting for a human to drop sources into `raw/`, the scout proactively identifies gaps, researches them online, and files the results. Each run makes the wiki richer and the scout itself smarter.

## Prerequisites

- [ ] NotebookLM MCP tools available in the session
- [ ] Vault open and readable
- [ ] Human available for gap approval (step 2)

## Steps

1. `[agent]` **Scan for knowledge gaps.** Read `index.md`, `log.md`, the last lint report in `Inbox/`, and `gap-priorities.md`. Then scan:
   - Corporate hubs in `10-Projects/*/` — which entities have no description beyond a name?
   - Project pages — which are stubs (< 5 sentences of real content beyond directory trees and Dataview queries)?
   - `40-Resources/` — what concept pages are missing? What topics are mentioned across projects but have no dedicated page?
   - Cross-references — which pages link to nothing and are linked from nothing?
   - Stale pages — which have `updated` dates older than 2 weeks?

   Rank the top 3-5 gaps by compound value: gaps that connect 3+ existing pages score highest. Stub enrichment scores next. Brand-new concept pages score third. Present as a numbered list with rationale for each.

2. `[human]` **Review and approve gaps.** Review the ranked gap list. Reorder, remove, or add gaps. Confirm which gaps to research this run. The scout will not proceed without approval. (GATE: creative — gap selection is strategic.)

3. `[agent]` **Research via NotebookLM.** For each approved gap:
   - Create a notebook: `mcp__notebooklm__notebook_create(title="[YYYY-MM-DD] Scout — <gap topic>")`
   - Add 2-4 web sources via `mcp__notebooklm__source_add`. Start with Wikipedia for concept overviews, then add recent articles, official docs, or tutorials depending on the topic. Use `type: "url"` for web pages, `type: "text"` for direct content.
   - Check source processing status via `mcp__notebooklm__source_list` — wait until all sources show "ready."
   - Query the notebook with 3 questions via `mcp__notebooklm__notebook_query`:
     1. "What are the key concepts and facts about <topic>? Provide a structured overview."
     2. "How does <topic> connect to <related vault topics>? What are the relationships?"
     3. "What are the practical implications or actionable insights from <topic>?"
   - Extract cited findings from each query response.

4. `[agent]` **Synthesize into wiki pages.** For each researched gap:
   - Create a concept page in `40-Resources/` (for general topics) or enrich the existing stub page (for project-specific gaps).
   - Format with proper frontmatter per the schema in `CLAUDE.md`. Include a `source` field linking to the NotebookLM notebook if possible.
   - Add wikilinks to all related pages. If enriching an existing page, preserve its original content and add a `## Research Notes` section.
   - Add plain-text link lists below any Dataview query blocks (for LLM readability outside Obsidian).
   - If the research contradicts existing claims in the vault, flag the contradiction explicitly with a `> ⚠️` callout.

5. `[agent]` **Update navigation.**
   - Update `index.md` with any new pages and updated summaries.
   - Append to `log.md`: `## [YYYY-MM-DD] scout | <gaps researched>` with a brief summary of each gap, pages created/updated, and key insights.
   - Update `gap-priorities.md`: move researched gaps to the "Researched" table with result page links. Add any new gaps discovered during research to the "Unresearched" table.

6. `[agent]` **Self-improve.** Read the "Research Strategies" section below. Based on this run:
   - What source types produced the best answers? (Wikipedia? Official docs? Tutorials? Recent articles?)
   - What query phrasing produced the best synthesis? ("Key concepts" questions? "How connects to" questions? "Practical implications" questions?)
   - What gap types were most valuable to fill? (Stub enrichment? New concept pages? Cross-reference building?)
   - What didn't work?

   Append findings with today's date under the relevant strategy section. If a strategy consistently fails (3+ runs with poor results), add a warning. If a new strategy works well, add it as a recommended approach. If you discover a better way to phrase the 3 research questions, update them in step 3.

7. `[human]` **Review results.** Read the new and updated pages. Request edits, approve as-is, or flag gaps for re-research. The scout's job is done — the human decides if the synthesis is good enough.

## Expected Outputs

- 3-5 gap descriptions with priority rationale (presented to human)
- 1-3 NotebookLM notebooks with 2-4 sources each
- 1-3 new or enriched wiki pages with proper frontmatter and cross-references
- Updated `index.md`, `log.md`, `gap-priorities.md`
- Updated "Research Strategies" section in this file

## Tools & Automations

- `mcp__notebooklm__notebook_create` — Create research notebooks
- `mcp__notebooklm__source_add` — Add web and text sources
- `mcp__notebooklm__source_list` — Check source processing status
- `mcp__notebooklm__notebook_query` — Query notebooks for synthesized answers
- `mcp__notebooklm__notebook_list` — List existing notebooks (avoid duplicates)
- Obsidian Read/Write/Edit for vault operations

## Guardrails

- **Max 3 gaps per run** — Prevents runaway research sessions. If more than 3 high-priority gaps exist, save them for the next run.
- **Max 4 sources per gap** — Keeps notebooks focused and processing fast.
- **Never overwrite without confirmation** — New content goes to `40-Resources/` or enriches existing pages with `## Research Notes` sections. Never delete existing content.
- **All research attributed** — Every new page cites its NotebookLM source.
- **Contradictions flagged** — If research contradicts vault claims, use `> ⚠️` callouts.
- **Idempotent** — Check `gap-priorities.md` before researching to avoid duplicate work.

---

## Research Strategies

Strategies evolve over time based on what works. Updated by the agent after each run (step 6).

### Source Strategies

- [2026-06-09] **Wikipedia first.** Wikipedia pages are the best starting source for concept overviews — they're structured, comprehensive, and NotebookLM handles them well. Start every topic research here.
- [2026-06-09] **Pair technical docs with tutorials.** Official documentation produces dense, accurate but hard-to-synthesize output. Always pair with a tutorial or blog post that explains the same concepts in plain language.

### Query Strategies

- [2026-06-09] **"Key concepts and how they connect"** — this phrasing produces the best synthesis for new concept pages. It forces the notebook to identify the core ideas AND their relationships.
- [2026-06-09] **"Practical implications"** — this query works well for enriching project pages with actionable context. Use it when the gap is about a project that needs more substance.
- [2026-06-09] **Three-question cadence** — (1) overview, (2) connections, (3) implications. This order builds: facts first, then relationships, then meaning. Don't skip the connections question — it's what produces cross-references.

### Gap Strategies

- [2026-06-09] **Connectivity is the highest-value signal.** A gap that connects 3+ existing pages is worth more than a gap that only affects one page. Prioritize gaps that will create the most wikilinks.
- [2026-06-09] **Stub enrichment is highest yield per minute.** Taking a page from 1 sentence to 1 paragraph with cross-references takes less research time than creating a brand-new concept page, and immediately improves the vault for anyone reading that page.
- [2026-06-09] **Corporate hubs first.** The 11 corporate entities are the backbone of the vault. Each one that's still a stub is a missing piece in the overall map. Prioritize these above project-level gaps.

### Anti-Strategies (what to avoid)

- [2026-06-09] **Don't research what the vault already knows.** Always check existing pages before creating new ones. A gap that's already covered is wasted time.
- [2026-06-09] **Don't go deep on one gap at the expense of others.** Better to cover 2-3 gaps at moderate depth than 1 gap exhaustively. The scout's value is in breadth of coverage, not depth per topic.
