---
title: "Search Configuration"
date: "2026-06-09"
category: system
tags:
  - system
  - search
  - configuration
---
# Search Configuration

## Obsidian Search Settings

Configure in Settings → Files & Links → Search:

- **Search in file content**: ON (searches body text, not just filenames)
- **Show context around matches**: ON
- **Case sensitive**: OFF (looser search finds more)
- **Explain search**: OFF (cleaner results)

## Recommended Hotkey

Set search to `Cmd+Shift+F` for quick access (Settings → Hotkeys → Search: Search in all files).

## Search Tips for This Vault

### Finding anything fast
- `project:my-project` — restricts to files in `10-Projects/my-project`
- `path:Skills` — restricts to skill templates
- `path:logs` — restricts to execution and run logs
- `[agent]` — finds all agent-executable skill steps
- `[AWAITING_DECISION]` — finds all paused agent runs

### Dataview-powered search (in-app)
The Home dashboard queries are the primary search mechanism:
- Unprocessed captures → Home dashboard
- Active projects → Home dashboard
- Agent decisions pending → Home dashboard

### Grep / CLI search (outside Obsidian)
```bash
# Find all agent runs awaiting decisions
grep -r "AWAITING_DECISION" 30-Automations/logs/

# Find all references to a project
grep -r "\[\[10-Projects/my-project\]\]" .

# Find all skill templates in a domain
ls 20-Skills/content-creation/
```

## Performance Note

Obsidian search works best on Markdown files (< 10MB total). This vault is designed to stay well within that boundary. If search slows down, archive completed projects by moving them to `40-Resources/Archive/`.
