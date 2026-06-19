---
name: "Knowledge Scout"
domain: "research"
prerequisites:
  - "WebSearch + WebFetch available (PRIMARY research path for cron — NotebookLM auth has failed 3 consecutive cron runs)"
  - "NotebookLM MCP tools available (preferred only for interactive runs where a human can re-auth)"
  - "Obsidian vault open"
estimated_time: "30 minutes per run"
tools:
  - "WebSearch + WebFetch (primary for cron)"
  - "NotebookLM MCP (notebook_create, source_add, notebook_query, source_list) — interactive runs only"
  - "Obsidian Read/Write/Edit"
agent_executable: true
agent_steps: [1, 3, 4, 5, 6]
tags:
  - skill
  - research
  - self-learning
version: 2
last_updated: "2026-06-19"
---
# Knowledge Scout

Autonomous research skill. Scans the vault for knowledge gaps, researches them via NotebookLM, and synthesizes findings into wiki pages. Improves its own research strategies over time.

## Purpose

Find what the vault doesn't know and fill it in. Instead of waiting for a human to drop sources into `raw/`, the scout proactively identifies gaps, researches them online, and files the results. Each run makes the wiki richer and the scout itself smarter.

## Prerequisites

- [ ] **WebSearch + WebFetch available — the PRIMARY research path for cron runs.** NotebookLM auth has failed 3 consecutive cron runs (2026-06-15/16/17). Don't attempt `notebook_list` in cron unless someone re-ran `npx oneclicklm login` since the last failure.
- [ ] NotebookLM MCP tools — *preferred only for interactive runs* where a human can re-authenticate.
- [ ] Vault open and readable
- [ ] Human available for gap approval (step 2) — skipped in autonomous cron runs; record gap-selection rationale in `log.md` instead.

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
- [2026-06-15] **WebSearch + WebFetch is a viable fallback when NotebookLM auth is down.** In an autonomous cron run, NotebookLM returned `No cookies found` (can't interactively re-login). WebSearch to identify the source + WebFetch with a targeted extraction prompt produced clean, citable findings just as good as a notebook query — and faster (no source-processing wait). For cron runs especially, web tools are more reliable than NotebookLM's auth. Always keep `source:` frontmatter attribution regardless of tool. Don't abort a scout run just because NotebookLM is unavailable.
- [2026-06-16] ⚠️ **NotebookLM auth has now failed two consecutive cron runs (2026-06-15, 2026-06-16) — treat web tools as the DEFAULT for cron, not the fallback.** Don't even attempt `notebook_list` first in a cron context unless someone has re-run `npx oneclicklm login` since the last failure. The WebSearch→WebFetch flow is reliable, faster, and well-attributed. If a *third* run fails, the skill's "NotebookLM MCP available" prerequisite should be rewritten to make web research primary. (NotebookLM is still preferred for interactive runs where a human can re-auth.)
- [2026-06-16] **Two queries cover a hub page: one for facts, one for the angle that matters here.** For the Costa Rica page, the visa/tax search gave the facts and a second "corporate setup / holding company / banking" search surfaced the one detail that actually matters to Fortisyn (banks decline pure holding companies with no local ops). Don't run a generic three-question cadence on a hub gap — run one broad fact query, then one query aimed at the vault's specific stake in the topic.
- [2026-06-15] **For external entities, search with disambiguating context, not just the name.** "AES Engineering" alone is ambiguous (many firms). Searching `"AES Engineering Ltd Vancouver building systems"` — using vault context (Canadian .ca client, Vancouver project names) — pinned the exact firm (aesengr.com) on the first try. Pull discriminators from the vault before searching.

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
- [2026-06-12] **Stale reference correction is high-value, low-effort.** When an entity rebrands, project pages referencing the old name become stale. Correcting versa-admin/api/store from "Versa" to "Mercova" took no research — just rewriting page content and updating wikilinks. Score stale-reference sweeps high: they fix factual errors and add architecture context at near-zero research cost.
- [2026-06-12] **Cross-source book research.** When a book title isn't on the author's site, check Amazon Author pages and books.by. Roy Hudlin's 5th book was found via Amazon URL (ASIN B0CTPCN8RD) after it didn't appear on royhudlin.com, literaryimprint.com, or books.by. The Amazon slug gave the title even when the page itself was blocked.
- [2026-06-15] **Broken-link scan is the best gap-finder.** A wikilink that points to a non-existent page is a gap that 3+ pages have *already voted* is worth filling. `grep -rn "target-path"` for a missing page reveals exactly how many pages need it (AES Engineering: 5+). Run a broken-link sweep at the start of every scout — these gaps come pre-ranked by inbound demand and beat speculative new concept pages. Creating the page at the *exact path the broken links use* (even if frontmatter purity suffers — e.g. an external client at `_corporate-hub.md`) resolves all of them at once.
- [2026-06-16] **When the lint queue and gap registry are exhausted, sweep for recurring terms.** By run #8 the gap registry held only "Low" human-input items and all lint recs were resolved. The highest-value gaps were found with `grep -rl "<term>"`: Costa Rica (14+ pages) and MindTechArt (11+ pages) were mentioned *everywhere* but had no page. A concept that 10+ pages reference is a pre-voted high-connectivity gap, exactly like a broken link but without the link. Run a recurring-term sweep when the obvious queues run dry: grep candidate proper nouns/concepts, count `-l` hits, and the ones with no page of their own and 5+ mentions are your gaps.
- [2026-06-16] **Uncataloged-page sweep catches non-scout content.** `for f in *.md; do grep -q $(basename) index.md || echo $f; done` found 5 ChatGPT-import pages + an agent that entered the vault outside the scout/lint loop and were never cataloged. These are *navigation* gaps (cataloging + backlinks), not research gaps — handle them in the update step and don't spend a max-3 research slot on them. Several already had inbound links from their hub but were just missing from index.md.
- [2026-06-16] **Broken-link scans need aggressive false-positive filtering.** This run's raw broken-link sweep returned only noise: directory links (`[[10-Projects/]]`), code-file links my `.md` check mangled (`[[...run-agent.js]]`), and template placeholders (`{{VALUE:project}}`, `path/to/skill`). Strip directory links, `.js/.html/.json` targets, and `{{...}}`/`path/to/*` examples before trusting the list. A clean scan is gold (see 2026-06-15); an unfiltered one wastes time.
- [2026-06-16] **Ground internal/brand concepts in an external movement.** MindTechArt is a personal brand — it would have been easy to write it from vault content alone. Instead, anchoring the fuzzy "Tech" pillar to the documented **calm-technology** movement (Amber Case, Calm Tech Institute) gave it a citable backbone and turned a personal-brand page into a real concept page. Even "internal" gaps benefit from one web-research pass that connects them to an established framework.
- [2026-06-15] **Pair a skill template with its concept page.** social-media-automation (executable skill) and Social Media Marketing (domain concept) drew from the same two web sources. Writing both in one run cost one research pass and produced a clean separation: 40-Resources/ holds the *why/what*, 20-Skills/ holds the *how*, and they cross-link. When a gap is "we do X but have no page on X," check whether X needs both a concept page and a skill — and source them together.
- [2026-06-15] **Lint reports are a pre-ranked gap queue.** The 2026-06-13 lint's "Recommendations" list mapped almost 1:1 to this run's top gaps. Read the latest lint report's recommendations first — the linter already did the connectivity analysis. Verify each is still open (specs/ rec was stale — directory gone) before researching.
- [2026-06-17] **Always check for an uncataloged *later* lint report before trusting "the last lint."** This run found `Inbox/lint-2026-06-15.md` that wasn't in index.md — newer than the 2026-06-13 report I'd have used otherwise. Run the uncataloged-page sweep *first* so the "read the last lint report" step actually reads the latest one.
- [2026-06-17] **The recurring-term sweep produces themed *clusters*, not just single gaps — split a cluster into a trilogy of distinct, interlocking concept pages.** This run's infra terms (Kubernetes, Cloudflared, UniFi, Starlink, Home Assistant, Z-Wave) didn't make one page — they split into three distinct domains (cloud / LAN / IoT) that cross-reference each other (CGNAT-on-Starlink is *why* ingress uses Cloudflare Tunnel; IoT rides an isolated VLAN). Three interlocking pages create far more wikilinks than one sprawling page, and each is independently findable. When a sweep returns a themed cluster, look for the natural seams (here: layer of the stack) and make one page per layer.
- [2026-06-17] **ChatGPT-export conversations are a free grounding corpus — read 3-4 of the richest before writing an infra/technical concept page.** The export conversations (e.g. *Kubernetes Setup on DigitalOcean* 300 msgs, *Plex Cloudflared Tunnel Setup*, *Home Assistant Z-Stick setup*, *Starlink and Dream Wall setup*) gave exact, citable real-world detail — DigitalOcean `doctl`/`helm`, Aeotec Z-Stick 10 Pro on a Silicon Labs CP2105, Ubiquiti UDW-US adopted over `ui.com`. This turns a generic web-sourced concept page into one grounded in *what Fortisyn actually runs*. Pattern: WebSearch for the 2026 best-practice frame, then quote the vault conversation for the concrete stack. Grep `chatgpt-conversations/` by keyword before researching any technical gap.
- [2026-06-17] ⚠️ **NotebookLM auth has now failed THREE consecutive cron runs — the skill prerequisite was rewritten this run to make WebSearch+WebFetch the PRIMARY path (version 2).** The web flow is reliable, fast (no source-processing wait), and well-attributed. NotebookLM is now documented as interactive-only. If Roy re-runs `npx oneclicklm login`, NotebookLM can resume for interactive sessions, but cron should keep defaulting to web tools.
- [2026-06-19] ⚠️ **FOURTH consecutive NotebookLM auth failure (now -15/-16/-17/-19).** Confirms the v2 decision was right — don't waste a step attempting it in cron. (I did run one cheap `notebook_list` this run because the task prompt explicitly named NotebookLM; it failed instantly with `No cookies found`, costing nothing. Acceptable to spot-check once if a prompt insists, but never build the run around it.)
- [2026-06-19] **The recurring-term sweep keeps producing themed *backbone* clusters — runs #8/#9/#10 each found one, and the pattern is now predictable.** Run #9 = tech-infra trilogy (cloud/LAN/IoT). Run #10 = corporate+agentic backbone (holding-trust / MCP / agentic-orchestration). The vault names its scaffolding everywhere (entity names, `.js` files, tool names) but rarely writes the *concept* down. When the lint/gap queues are dry, the highest-value move is: grep proper-noun/concept frequency, filter to terms with **no page of their own + 5+ mentions**, then look for the natural seam that splits them into 2-3 interlocking pages. Two of three usually interlock; the third is a high-connectivity standalone.
- [2026-06-19] **Internal `.js`/config files are a grounding corpus, just like the ChatGPT exports.** The agentic-orchestration page didn't need much web research — reading `gates.js`, `tools.js`, and `run-agent.js` *was* the research. The web pass (2026 HITL/orchestration practice) just provided the external frame to connect the vault's real implementation to. Pattern for "we built X but have no page on X" gaps: read the actual source files first, write what the code really does, then one web search for the established framework it instantiates. This is the code-equivalent of the 2026-06-16 "ground internal/brand concepts in an external movement" strategy.
- [2026-06-19] **A new concept page is the best anchor for fixing a stale page nearby.** Writing the holding-company concept page made the stale Corporate Registry (old entity names, "12 entities") an obvious adjacent fix — and the new page gave it something authoritative to link to. When a concept page lands, grep for the oldest/most-stale pages that mention the same concept and refresh them in the same run; the research is already done.
