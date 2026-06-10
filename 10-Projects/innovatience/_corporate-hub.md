---
name: "Innovatience"
type: "corporate-hub"
status: "active"
description: "Consulting firm — currently the primary revenue engine for Fortisyn"
parent: "[[10-Projects/fortisyn/_corporate-hub|Fortisyn]]"
path: "/home/projects/innovatience"
tags:
  - corporate-hub
  - innovatience
updated: "2026-05-18"
---

# Innovatience

**The consulting firm.** This is where the money comes in right now — the primary revenue engine for the Fortisyn umbrella.

## Key Client

- **[[10-Projects/aesengineering/_corporate-hub|AES Engineering]]** is the main client for Innovatience

## Active Projects

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  status AS "Status",
  priority AS "Priority"
FROM "10-Projects/innovatience"
WHERE tags INCLUDES "project" AND status != "archived"
SORT priority ASC
```

## Projects

- [[10-Projects/innovatience/accounting|Chart of Accounts Pro]] — Accounting application
- [[10-Projects/innovatience/website|Website]] — Web presence

## Notes

### 2026-05-18
- Innovatience consulting drives revenue — priority projects here fund everything else
