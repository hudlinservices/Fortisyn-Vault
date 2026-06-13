---
name: "Python Slayers"
type: "corporate-hub"
status: "active"
description: "Software arm of Fortisyn — full-stack development and digital solutions"
path: "/home/projects/pythonslayers"
url: "https://pythonslayers.com"
tags:
  - corporate-hub
  - pythonslayers
updated: "2026-06-09"
---
# Python Slayers

**Full-stack development and digital solutions.** Software arm of Fortisyn. Builds AI-powered applications, automation systems, and full-stack web platforms for all entities across the umbrella.

**URL:** [pythonslayers.com](https://pythonslayers.com)

## Active Projects

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  status AS "Status",
  priority AS "Priority"
FROM "10-Projects/pythonslayers"
WHERE tags INCLUDES "project" AND status != "archived"
SORT priority ASC
```

## Projects

- [[10-Projects/pythonslayers/chat-assistant|Chat Assistant]] — AI chat application (personal)
- [[10-Projects/pythonslayers/my-brain|My Brain]] — Agentic personal OS (this vault)
- [[10-Projects/pythonslayers/spanish-tutor|Spanish Tutor]] — Language learning app (personal)
- [[10-Projects/pythonslayers/slf-for-roy|SLF for ROY]] — Personal AI companion (tutor, coach, assistant, mentor)
- [[10-Projects/pythonslayers/OneClickLM|OneClickLM]] — NotebookLM MCP server

## Related Entities

- [[10-Projects/fortisyn/_corporate-hub|Fortisyn]] — Parent holding company
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — IT infrastructure (hosting, deployment)
- All other Fortisyn entities — builds and maintains their software

## File System

```
/home/projects/pythonslayers/
└── my_brain/          ← This vault (deprecated path)

/home/personal/
├── chat-assistant/    ← AI chat app (backend + frontend)
├── spanish-tutor/     ← Language learning platform
├── slf/               ← Personal AI companion (tutor, coach, assistant, mentor)
│   ├── backend/       ← Django API + knowledge graph
│   ├── frontend/      ← React PWA
│   └── vault/         ← Personal knowledge vault
```
