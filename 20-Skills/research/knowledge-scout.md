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

3. `[agent]` **Research via NotebookLM.** Use one persistent notebook across all scout runs:
   - Call `mcp__notebooklm__notebook_list` first. If a notebook titled "Knowledge Scout" exists, use it by its `notebook_id`. If not, create one: `mcp__notebooklm__notebook_create(title="Knowledge Scout")`.
   - This notebook persists permanently — sources accumulate and queries build on prior context across every run.
   - For each approved gap:
     - Add 2-4 web sources via `mcp__notebooklm__source_add`. Prefer website URLs for corporate entities, Wikipedia for concept overviews, official docs paired with tutorials for technical topics. Use `type: "url"` for web pages, `type: "text"` for direct content or SPA meta descriptions.
     - Check source processing status via `mcp__notebooklm__source_list` — wait until all sources show "ready."
     - Query with targeted questions via `mcp__notebooklm__notebook_query`:
       - Corporate entities: "What are the key facts about <entity>? What services do they offer and how do they connect to related entities?"
       - Concepts: "What are the key concepts and how do they connect to <related topics>?"
       - Stubs: "What information would enrich a page about <topic>? What are the key components and practical details?"
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
- [2026-06-09] **SPA sites need text sources.** React SPAs (like auron.media, mercovaretail.com) can't be processed as NotebookLM URL sources — the server only returns a bare `<div id="root">`. Instead, `curl` the page meta tags (`<title>`, `<meta name="description">`) and add them as `type: "text"` sources. NotebookLM synthesizes surprisingly well from just meta descriptions + background context.
- [2026-06-09] **Domain sweeping is high-yield and near-zero cost.** Before researching corporate entities, do a batch `curl` across all likely domain names (entityname.com). One sweep found 5 live URLs in seconds. Some sites are SPAs (only meta tags visible) but those meta descriptions alone are valuable. Always do a domain sweep at the start of a scout run — it costs nothing and often finds bonus URLs for gaps you weren't even researching.
- [2026-06-09] **Try spelling variations on domains.** soleriatechnology.com didn't resolve but sol**aria**technology.com does — the company name is "Soleria" but the domain uses "a." When a domain doesn't resolve, try common vowel variations before giving up. The user may know the correct spelling.

### Query Strategies

- [2026-06-09] **"Key concepts and how they connect"** — this phrasing produces the best synthesis for new concept pages. It forces the notebook to identify the core ideas AND their relationships.
- [2026-06-09] **"Practical implications"** — this query works well for enriching project pages with actionable context. Use it when the gap is about a project that needs more substance.
- [2026-06-09] **Three-question cadence** — (1) overview, (2) connections, (3) implications. This order builds: facts first, then relationships, then meaning. Don't skip the connections question — it's what produces cross-references.
- [2026-06-09] **Rebrand-specific queries work well.** Asking "how does the rebrand from X change the company's positioning?" produced detailed before/after comparison tables from NotebookLM. For rebrand research, make the before/after explicit in the query.
- [2026-06-09] **Single comprehensive query beats three separate ones for corporate entities.** For personal brands and companies with sites as primary sources, one detailed multi-part question ("What are the key facts? What are the books/services? How does the brand position them?") produced richer results than splitting across three queries. The NotebookLM synthesized the site content more cohesively when asked for everything at once.

### Gap Strategies

- [2026-06-09] **Connectivity is the highest-value signal.** A gap that connects 3+ existing pages is worth more than a gap that only affects one page. Prioritize gaps that will create the most wikilinks.
- [2026-06-09] **Stub enrichment is highest yield per minute.** Taking a page from 1 sentence to 1 paragraph with cross-references takes less research time than creating a brand-new concept page, and immediately improves the vault for anyone reading that page.
- [2026-06-09] **Corporate hubs first.** The 11 corporate entities are the backbone of the vault. Each one that's still a stub is a missing piece in the overall map. Prioritize these above project-level gaps.
- [2026-06-09] **Rebrand research has cascading value.** When a corporate entity rebrands, it touches multiple pages: the hub itself, the Fortisyn parent hub (subsidiary list), index.md (section headers and summaries), gap-priorities.md, and any project pages referencing the old name. One rebrand discovery = 5+ page updates. Score rebrand gaps higher.
- [2026-06-09] **Pair related gaps to save research time.** Roy Hudlin and Literary Imprint share the same 5 books — researching them together meant the book titles only had to be discovered once. When two gaps share a data dependency (books, clients, projects), batch them in the same scout run. The NotebookLM queries for each entity will independently surface the shared data, cross-validating it.

### Anti-Strategies (what to avoid)

- [2026-06-09] **Don't research what the vault already knows.** Always check existing pages before creating new ones. A gap that's already covered is wasted time.
- [2026-06-09] **Don't go deep on one gap at the expense of others.** Better to cover 2-3 gaps at moderate depth than 1 gap exhaustively. The scout's value is in breadth of coverage, not depth per topic.
- [2026-06-09] **Don't rely on URL sources for React SPAs.** NotebookLM's URL fetcher returns errors for single-page apps (auron.media, mercovaretail.com). Check with `curl` first — if the HTML is just `<div id="root">`, skip the URL source and use text sources instead. Saves a failed source slot per notebook.
- [2026-06-09] **NotebookLM queries may need retries.** The Auron Media query failed with "RPC rLM1Ne failed: fetch failed" on first attempt but succeeded on retry. Always retry once before giving up on a notebook query.
- [2026-06-09] **Don't defer URL-only gaps to a dedicated research run.** Domain sweeps are so cheap they should be done in every run as a side effect. Aurora Legacy's URL was discovered while researching other gaps — it took zero extra NotebookLM notebooks. URL discovery doesn't count against the max-3-gap guardrail.

- [2026-06-12] **One persistent notebook, not per-run notebooks.** Creating a new NotebookLM notebook for every scout run fragments knowledge — the notebook can't learn across runs if sources are siloed. Use one persistent "Knowledge Scout" notebook. Call `notebook_list` at the start of Step 3, create it only once, and add sources cumulatively. Each run's queries benefit from every previous run's sources. The notebook gets smarter the more you use it.
