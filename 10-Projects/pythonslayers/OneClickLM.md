---
name: OneClickLM
status: active
priority: P2
deadline: ""
goals:
  - Publish to npm and Smithery registry
  - Submit to awesome-mcp-servers lists
tags:
  - project
  - mcp
  - typescript
  - notebooklm
created: 2026-05-21
updated: 2026-05-21
---

# OneClickLM

## Overview

The NotebookLM MCP server that actually works. Auto-healing auth, zero config, one command. Speaks Google's internal `batchexecute` RPC protocol, allowing AI coding assistants (Claude Code, Cursor, VS Code) to interact with Google NotebookLM notebooks.

**Repo:** [github.com/hudlinservices/OneClickLM](https://github.com/hudlinservices/OneClickLM)
**Local:** `~/OneClickLM`
**Stack:** TypeScript, Node.js 18+, `@modelcontextprotocol/sdk`, `puppeteer-core`

## Architecture

```
src/index.ts          → MCP server entry point
bin/cli.ts            → CLI (login, refresh, status, version, help)
src/auth/             → Google auth (Puppeteer login, cookie persistence, token extraction)
src/client/           → batchexecute RPC protocol, notebook/source CRUD
src/mcp/              → MCP server setup + 6 tool definitions
src/queue/            → Serial request queue (no concurrent crashes)
src/utils/            → Error hierarchy, structured logging
```

## Goals

- [x] Auto-healing auth (token refresh on 400/401)
- [x] 6 MCP tools (list, get, query, create notebooks + add/list sources)
- [x] Request queue for serial call processing
- [ ] Publish to npm
- [ ] Submit to Smithery registry
- [ ] Submit to awesome-mcp-servers

## Tasks

### Active

- [ ] Publish to npm
- [ ] Create banner/cover image for README

### Backlog

- [ ] Demo GIF showing real usage
- [ ] Submit to Smithery registry
- [ ] Submit to awesome-mcp-servers
- [ ] Reddit/HN/X launch posts

## Agent Delegations

```dataview
TABLE WITHOUT ID
  file.link AS "Run Log",
  status AS "Status",
  delegated_outcome AS "Delegated Outcome",
  steps_completed + "/" + steps_total AS "Progress"
FROM "30-Automations/logs"
WHERE contains(file.frontmatter.project, "OneClickLM")
SORT start_time DESC
```

## Decisions

| Date | Decision | Context |
|------|----------|---------|
| 2026-05-21 | Forked from CRtheHILLS/OneClickLM to hudlinservices | Original repo auth mismatch with local git credentials |

## Resources

- [[40-Resources/model-context-protocol|Model Context Protocol]] — the standard OneClickLM implements (concept page)
- [NotebookLM](https://notebooklm.google.com/)
- [MCP SDK docs](https://github.com/modelcontextprotocol/sdk)

## Skills Used

- TypeScript
- MCP protocol
- Google batchexecute RPC (reverse-engineered)
- Puppeteer (headless auth)

## Execution Log

```dataview
TABLE WITHOUT ID
  file.link AS "Log",
  date AS "Date",
  executor AS "By",
  status AS "Status"
FROM "20-Skills/logs"
WHERE contains(file.frontmatter.project, "OneClickLM")
SORT date DESC
```

## Notes

### 2026-05-21
- Initial setup: repo created, remote pointed to hudlinservices, first commit pushed (Chrome window placement fix)
- Full codebase read and understood — 13 source files, ~1,500 LOC
- Build succeeds cleanly with `tsc`
- npm publish pending (need npmjs.com account)
