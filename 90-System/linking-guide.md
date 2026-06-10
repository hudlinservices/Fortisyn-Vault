# Bidirectional Linking Guide

## How links work in this system

Every entity links bidirectionally using Obsidian wikilinks `[[link]]`. When Note A links to Note B, Note B's backlinks pane shows Note A automatically.

## Linking chain verification

The full linking chain that keeps the system connected:

```
Home Dashboard
  → Daily Note (via Dataview)
  → Project Hubs (via Dataview)
  → Agent Run Logs (via Dataview)

Daily Note
  ← captured items link to Project Hubs via #project/ tags
  ← agent activity auto-links to Agent Run Logs from frontmatter

Project Hub
  → links to Skill Templates via ## Skills Used
  → links to Agent Run Logs via ## Agent Delegations (Dataview)
  → links to Skill Execution Logs via ## Execution Log (Dataview)

Skill Template
  → links to Automation Pipelines via ## Tools & Automations

Agent Definition
  → links to Skill Templates via allowed_skills frontmatter

Agent Run Log
  → links to Agent Definition via agent frontmatter
  → links to Project Hub via project frontmatter
  → links to Skill Execution Logs when skills are executed
```

## Creating a valid link

1. Use `[[` and start typing the note name — Obsidian autocompletes
2. For project tags in captures: use `#project/project-name`
3. For frontmatter links: use `"[[path/to/note]]"` (quoted wikilink)

## Testing links

1. Open any note
2. Open the backlinks pane (right sidebar or `Cmd+Shift+B`)
3. You should see all notes that reference the current note
4. If a link is broken (no backlink), the wikilink target note doesn't exist yet
