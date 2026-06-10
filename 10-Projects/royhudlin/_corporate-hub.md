---
name: "Roy Hudlin"
type: "corporate-hub"
status: "active"
description: "Personal brand — author of 5 books, social media content, thought leadership"
parent: "[[10-Projects/fortisyn/_corporate-hub|Fortisyn]]"
path: "/home/projects/royhudlin"
tags:
  - corporate-hub
  - royhudlin
updated: "2026-05-18"
---

# Roy Hudlin

**Personal brand entity.** Author of 5 books (published through [[10-Projects/literaryimprint/_corporate-hub|Literary Imprint]]). Social media content, book snippets, thought leadership, and personal brand building.

## Role

- Personal brand development and content
- Social media presence and engagement
- Book promotion and snippet distribution
- Thought leadership and speaking

## Active Projects

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  status AS "Status",
  priority AS "Priority"
FROM "10-Projects/royhudlin"
WHERE tags INCLUDES "project" AND status != "archived"
SORT priority ASC
```

## Digital Presence

- [[10-Projects/royhudlin/website/royhudlin-com|royhudlin.com]] — Personal brand website

## Related Entities

- [[10-Projects/literaryimprint/_corporate-hub|Literary Imprint]] — Published 5 books
- [[10-Projects/junglemedia/_corporate-hub|Jungle Media]] — Content production partner
- [[10-Projects/versaretail/royhudlin|Versa Retail → Roy Hudlin Store]] — E-commerce storefront (separate — retail, not personal brand)

## File System

```
/home/projects/royhudlin/
└── websites/
    └── royhudlin.com/    ← Personal brand website (backend + frontend + image-extract)
```
