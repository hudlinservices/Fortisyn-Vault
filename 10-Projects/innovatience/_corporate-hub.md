---
name: "Innovatience"
type: "corporate-hub"
status: "active"
description: "Technical Systems Consulting — primary revenue engine for the Fortisyn Group. Client: AES Engineering."
parent: "[[10-Projects/fortisyn/_corporate-hub|Fortisyn]]"
path: "/home/projects/innovatience"
url: "https://innovatience.ca"
tags:
  - corporate-hub
  - innovatience
updated: "2026-06-09"
---
# Innovatience

**Technical Systems Consulting.** The consulting arm of the Fortisyn Group — and the primary revenue engine. This is where the money comes in right now, funding the group's other ventures.

**URL:** [innovatience.ca](https://innovatience.ca)

## Services

Innovatience delivers technical systems consulting across:

| Area | Details |
|------|---------|
| **Software Development** | Custom applications (Node.js stack), accounting systems |
| **Infrastructure Design** | Network topology, lab environments, systems architecture |
| **Web Presence** | Corporate websites, digital identity |

## Key Client

### AES Engineering
The firm's primary client. AES Engineering is an industrial engineering firm that represents the core of Innovatience's current business — and the main source of revenue that funds the broader Fortisyn Group.

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

- [[10-Projects/innovatience/accounting|Chart of Accounts Pro]] — Professional accounting application (Node.js)
- [[10-Projects/innovatience/lab-network|Lab Network]] — Lab network infrastructure and topology
- [[10-Projects/innovatience/website|Website]] — innovatience.ca corporate website

## Related Entities

- [[10-Projects/fortisyn/_corporate-hub|Fortisyn]] — Parent holding company
- [[10-Projects/aesengineering/_corporate-hub|AES Engineering]] — Primary client
- [[10-Projects/pythonslayers/_corporate-hub|Python Slayers]] — Software development partner (builds deliverables)
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — IT infrastructure for consulting projects

## File System

```
/home/projects/innovatience/
├── accounting/     ← Chart of Accounts Pro (Node.js)
├── lab-network/    ← Network topology
└── website/        ← innovatience.ca
```

## Notes

### 2026-06-09
- Scout research: documented Technical Systems Consulting positioning, AES Engineering as primary client, innovatience.ca URL
- Site title: "Innovatience | Technical Systems Consulting"
- Innovatience funds the rest of Fortisyn — revenue engine status confirmed

### 2026-05-18
- Previously documented as consulting firm with AES as key client
