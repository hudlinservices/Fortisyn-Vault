---
title: "Schema"
date: "2026-06-09"
category: system
tags:
  - schema
  - system
  - conventions
---
# My Brain — Agentic Personal OS

Schema for this vault. Every LLM session starts here. This document tells the LLM how the wiki is structured, what conventions to follow, and what workflows to use when ingesting sources, answering questions, or maintaining the wiki.

## Mandatory First Reads

Before doing anything else, the LLM reads these two files to understand what's here and what's happened recently:

1. **[[index.md]]** — Catalog of every page in the wiki, organized by category with one-line summaries
2. **[[log.md]]** — Chronological record of all ingests, queries, lint passes, and structural changes

## Vault Structure

```
my_brain-vault/
├── raw/               ← Immutable source documents (articles, papers, clips)
├── 00-Dashboard/      ← Home dashboard, daily notes, weekly reviews
├── 10-Projects/       ← Corporate entities → project hubs
├── 20-Skills/         ← Reusable skill templates by domain
├── 30-Automations/    ← Scripts and agent run logs
├── 40-Resources/      ← Reference materials, MOCs, concept pages
├── 90-System/         ← Agent definitions, templates, runtime, config
├── Inbox/             ← Quick-capture staging — triage to correct location
├── index.md           ← Page catalog (LLM reads first)
├── log.md             ← Chronological record (LLM reads second)
└── CLAUDE.md          ← This file — the schema
```

## Key Principles

1. **Frictionless Capture** — store any thought in under 10 seconds via Inbox
2. **Text-First, Tool-Augmented** — all knowledge in Markdown; tools wrap around
3. **Progressive Disclosure** — show what's needed for current context
4. **Compose, Don't Duplicate** — pages linked, never copied
5. **Local-First, Sync-Second** — works offline; sync is optional
6. **Agentic Orchestration with Human Guardrails** — agents execute autonomously; pause at creative, destructive, and ambiguous gates
7. **Continuous Evolution** — every execution improves the templates
8. **Compounding Knowledge** — every ingest and query that produces insight gets filed back into the wiki

## Frontmatter Standards

Every page must have frontmatter. Use the correct schema for the page type:

### Dashboard / MOC pages
```yaml
title: "Page Title"
type: "moc"           # or "dashboard"
tags: [moc, topic]
updated: "YYYY-MM-DD"
```

### Project pages
```yaml
name: "Project Name"
status: "active"       # active | paused | archived
priority: "P1"         # P1-P4
corporate_entity: "[[_corporate-hub|Entity Name]]"
path: "/path/on/disk"
goals:
  - "Goal one"
  - "Goal two"
tags: [project, entity, stack]
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
```

### Skill pages
```yaml
name: "Skill Name"
domain: "domain-name"
estimated_time: "5 minutes"
agent_executable: false
tags: [skill, domain]
version: 1
last_updated: "YYYY-MM-DD"
```

### Agent definitions
```yaml
name: "Agent Name"
description: "What it does"
domains: [domain]
allowed_skills: ["[[path/to/skill]]"]
confirmation_gates: [publish, spend_money, modify_file]
model_preference: "claude-sonnet-4-6"
tags: [agent-definition]
version: 1
created: "YYYY-MM-DD"
```

### Concept / Reference pages
```yaml
title: "Page Title"
category: "reference"   # or "concept" or "comparison"
tags: [topic, subtopic]
date: "YYYY-MM-DD"
```

### Key rule
- Use `title` for display-oriented pages (dashboards, concepts, references)
- Use `name` for entity-oriented pages (projects, skills, agents)
- Always use `updated` or `last_updated` consistently — pick one per page type

## Page Naming Conventions

- All filenames use **kebab-case**: `chart-of-accounts.md`, `daily-note.md`
- Corporate hubs are always `_corporate-hub.md` (underscore prefix sorts to top)
- No Title-Case filenames — those are auto-generated stubs to be merged or deleted
- Daily notes: `YYYY-MM-DD.md`

## Ingest Workflow

When the human drops a source into `raw/` and says "ingest this":

1. **Read** the source file
2. **Discuss** key takeaways with the human — what's important, what to emphasize
3. **Create/update wiki pages:**
   - Write a summary page in `40-Resources/` (for general topics) or the relevant project directory
   - Extract entities, concepts, claims — create or update their pages
   - Note contradictions with existing claims — flag them explicitly
   - Add cross-references to related pages
4. **Update index.md** — add any new pages with links and one-line summaries
5. **Append to log.md** — `## [YYYY-MM-DD] ingest | Source Title` with a brief description of what was created/updated
6. **Report** what was done: pages created, pages updated, key insights extracted

A single source should touch 5-15 wiki pages. The goal is synthesis, not just summarization.

## Query Workflow

When the human asks a question against the wiki:

1. **Read index.md** — find relevant pages by category
2. **Read log.md** — check what's happened recently (may be relevant)
3. **Read the relevant pages** — drill into the ones the index pointed to
4. **Synthesize an answer** with citations — reference specific pages with wikilinks
5. **Offer to file the answer** — if the answer is valuable, offer to save it as a new wiki page. A comparison you built, an analysis, a connection you discovered — these compound the knowledge base.

## Scout Workflow

When the human says "scout" or "scout for gaps":

1. **Scan** — Read `index.md`, `log.md`, `gap-priorities.md`, and the last lint report. Scan corporate hubs, project pages, and `40-Resources/` for knowledge gaps: stubs, missing concept pages, disconnected pages, stale content.
2. **Rank** — Prioritize 3-5 gaps by compound value. Gaps that connect 3+ pages score highest. Stub enrichment scores next. New concept pages score third.
3. **Present** — Show the ranked list to the human for approval. Do not proceed without approval.
4. **Research** — For each approved gap: create a NotebookLM notebook, add 2-4 web sources, query with 3 questions (overview → connections → implications).
5. **Synthesize** — Create or enrich wiki pages with findings. Use proper frontmatter, cross-references, and source attribution. Flag contradictions.
6. **Update** — Update `index.md`, `log.md`, `gap-priorities.md`. Append to "Research Strategies" in `20-Skills/research/knowledge-scout.md` with what worked.
7. **File** — Human reviews results.

Full workflow defined in: [[20-Skills/research/knowledge-scout|Knowledge Scout]]

## Lint Workflow

The human says "lint the wiki" (run periodically, ~weekly):

1. **Contradictions** — search for conflicting claims across pages. If Page A says X and Page B says Y about the same thing, flag it.
2. **Stale claims** — find pages with `updated` dates older than 2 weeks. Check if claims still hold. Flag outdated content.
3. **Orphan pages** — find pages with no inbound links from other wiki pages. They may need links added or may be dead content.
4. **Missing pages** — find concepts, entities, or projects mentioned in pages but lacking their own page. Suggest creating them.
5. **Broken links** — find wikilinks pointing to non-existent pages.
6. **Missing cross-references** — find pages that should link to each other but don't.
7. **Data gaps** — find claims that could be strengthened with a web search or additional source. Suggest sources to look for.
8. **Frontmatter hygiene** — flag pages with missing or malformed frontmatter.

File findings as a new page in `Inbox/lint-YYYY-MM-DD.md` and append to `log.md`.

## Page Templates

When creating a new page, use the appropriate template from `90-System/templates/`:

| Page Type | Template |
|---|---|
| Project hub | `90-System/templates/project-hub.md` |
| Daily note | `90-System/templates/daily-note.md` |
| Weekly review | `90-System/templates/weekly-review.md` |
| Skill | `90-System/templates/skill-template.md` |
| Execution log | `90-System/templates/execution-log.md` |

## Tech Stack

- **Platform**: Obsidian (desktop) + Templater, Dataview, QuickAdd, Shell Commands
- **Agents**: Node.js + Anthropic SDK (Claude API)
- **Automation**: Bash scripts orchestrated by agents
- **Version Control**: Git → `github.com/hudlinservices/my_brain-vault`
