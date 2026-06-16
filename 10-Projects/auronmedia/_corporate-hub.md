---
name: "Auron Media"
type: "corporate-hub"
status: "active"
description: "Digital creation and marketing — websites, branding, and AI-powered campaigns. Formerly Jungle Media."
parent: "[[10-Projects/fortisyn/_corporate-hub|Fortisyn]]"
path: "/home/projects/junglemedia"
url: "https://auron.media"
tags:
  - corporate-hub
  - auronmedia
  - junglemedia
updated: "2026-06-16"
---
# Auron Media

**Digital creation and marketing.** Websites, branding, and AI-powered campaigns that get results. The creative engine for the entire Fortisyn umbrella — any entity needing content, video, social media, or branding goes through Auron Media.

**URL:** [auron.media](https://auron.media)

## Rebrand: Jungle Media → Auron Media

Auron Media was formerly **Jungle Media** (audio/video production, content creation, social media). The rebrand represents a strategic shift:

| Dimension | Jungle Media (old) | Auron Media (new) |
|-----------|-------------------|-------------------|
| Focus | Audio/video production | Digital creation and marketing |
| Core offering | Content and social media | Websites, branding, AI campaigns |
| Tech stack | Traditional media production | AI-powered marketing technology |
| Model | Media production house | Full-stack digital agency |

## Services

- **Website design and development** — digital platforms for Fortisyn entities and clients
- **Branding and visual identity** — brand signatures, logos, design systems
- **AI-powered marketing campaigns** — data-driven, performance-focused
- **Digital content creation** — video, social media, and content marketing across all channels

## Active Projects

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  status AS "Status",
  priority AS "Priority"
FROM "10-Projects/auronmedia"
WHERE tags INCLUDES "project" AND status != "archived"
SORT priority ASC
```

## Projects

- [[10-Projects/auronmedia/limited-edition-intro|Limited Edition Intro]] — Hyperframes video intro
- [[10-Projects/auronmedia/signatures|Signatures]] — Brand signatures and visuals
- [[10-Projects/auronmedia/social-media-strategy|Social Media Strategy]] — content themes, platforms, historical influencer concept

## Related Entities

- [[10-Projects/fortisyn/_corporate-hub|Fortisyn]] — Parent holding company
- [[10-Projects/royhudlin/_corporate-hub|Roy Hudlin]] — Personal brand (content, books, speaking)
- [[10-Projects/mercovaretail/_corporate-hub|Mercova Retail]] — White-label stores (branded merchandise)
- [[10-Projects/literaryimprint/_corporate-hub|Literary Imprint]] — Publishing (book covers, marketing)

## Notes

### 2026-06-16
- Scout #8: cataloged [[10-Projects/auronmedia/social-media-strategy|Social Media Strategy]] page

### 2026-06-09
- Scout research: documented rebrand from Jungle Media to Auron Media based on auron.media site and NotebookLM synthesis
- Directory on disk still `junglemedia/` — rename pending
- auron.media is a React SPA; description extracted from page meta

### 2026-05-18
- Previously documented as Jungle Media — creative engine for the umbrella
