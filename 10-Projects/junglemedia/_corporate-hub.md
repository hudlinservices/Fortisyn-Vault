---
name: "Jungle Media"
type: "corporate-hub"
status: "active"
description: "Audio/video production, content creation, media marketing, and social media company"
parent: "[[10-Projects/fortisyn/_corporate-hub|Fortisyn]]"
path: "/home/projects/junglemedia"
tags:
  - corporate-hub
  - junglemedia
updated: "2026-05-18"
---

# Jungle Media

**Audio/video, content creation, media marketing, and social media.** The creative engine — produces video compositions (Hyperframes), audio content, branding visuals, and runs social media presence across the Fortisyn umbrella.

## Capabilities

- Video production (Hyperframes compositions)
- Audio production and engineering
- Content creation and marketing
- Social media management
- Brand and visual identity

## Active Projects

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  status AS "Status",
  priority AS "Priority"
FROM "10-Projects/junglemedia"
WHERE tags INCLUDES "project" AND status != "archived"
SORT priority ASC
```

## Projects

- [[10-Projects/junglemedia/limited-edition-intro|Limited Edition Intro]] — Hyperframes video intro
- [[10-Projects/junglemedia/signatures|Signatures]] — Brand signatures and visuals

## Notes

### 2026-05-18
- Creative engine for the entire umbrella — any entity needing content/video/social goes through Jungle Media
