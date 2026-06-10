---
name: "Python Slayers"
type: "corporate-hub"
status: "active"
description: "Software arm of Fortisyn — AI, full-stack apps, and automation"
path: "/home/projects/pythonslayers"
tags:
  - corporate-hub
  - pythonslayers
updated: "2026-05-18"
---

# Python Slayers

Software arm of Fortisyn. Builds AI-powered applications, automation systems, and full-stack web platforms.

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

- [[10-Projects/pythonslayers/chat-assistant|Chat Assistant]] — AI chat application
- [[10-Projects/pythonslayers/my-brain|My Brain]] — Agentic personal OS (this vault)
- [[10-Projects/pythonslayers/spanish-tutor|Spanish Tutor]] — Language learning app

## File System

```
/home/projects/pythonslayers/
├── chat_assistant/    ← AI chat app (backend + frontend)
└── spanish_tutor/     ← Language learning platform
```
