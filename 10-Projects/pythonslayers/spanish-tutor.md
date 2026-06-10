---
name: "Spanish Tutor"
status: "active"
priority: "P2"
corporate_entity: "[[_corporate-hub|Python Slayers]]"
path: "/home/projects/pythonslayers/spanish_tutor"
deadline: ""
goals:
  - "Language learning application for Spanish"
tags:
  - project
  - pythonslayers
  - education
  - fullstack
created: "2026-05-18"
updated: "2026-05-18"
---

# Spanish Tutor

Language learning application focused on Spanish instruction.

## Overview

Full-stack language learning platform with backend, frontend, data layer, and formal specification documents.

## Goals

- [ ] Interactive Spanish learning experience
- [ ] Structured curriculum with progression
- [ ] Speech/pronunciation practice

## Tasks

### Active
- [ ] 

### Backlog
- [ ] 

## Structure

```
spanish_tutor/
├── backend/     ← API server
├── frontend/    ← UI / client
├── data/        ← curriculum data, vocab, exercises
└── specs/       ← specification documents
```

## Agent Delegations

```dataview
TABLE WITHOUT ID
  file.link AS "Run Log",
  status AS "Status",
  delegated_outcome AS "Delegated Outcome"
FROM "30-Automations/logs"
WHERE contains(file.frontmatter.project, "spanish-tutor")
SORT start_time DESC
```

## Skills Used

- 

## Notes

### 2026-05-18
- Initial hub created from vault corporate alignment
