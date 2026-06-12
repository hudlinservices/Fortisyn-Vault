---
name: "Limited Edition Intro"
status: "active"
priority: "P1"
corporate_entity: "[[_corporate-hub|Auron Media]]"
path: "/home/projects/junglemedia/limited-edition-intro"
goals:
  - "Hyperframes video intro for limited edition product launches"
tags:
  - project
  - auronmedia
  - hyperframes
  - video
  - remotion
created: "2026-05-18"
updated: "2026-06-12"
---
# Limited Edition Intro

**Hyperframes video composition.** A P1 Auron Media project producing animated video intros for limited edition product drops. Built with Hyperframes (Remotion-based video framework).

## Purpose

When a Mercova Retail brand launches a limited edition product, this project produces the launch video — the animated intro that plays on the product page, social media, and email campaigns. Think of it as the visual signature for scarcity-driven product releases.

## How It Fits

```
Auron Media                    Mercova Retail
─────────────                  ──────────────
Limited Edition Intro ──────► Jungle Wear (limited drops)
(video production)      ──────► Jungle Meditation (limited collections)
                        ──────► Roy Hudlin Store (limited merch)
```

The intro is a reusable Hyperframes template — swap product assets, adjust colors/branding, render. Each limited drop gets its own variant without starting from scratch.

## Structure

```
limited-edition-intro/
├── .hyperframes/       ← Hyperframes project config (composition, scenes, timing)
└── audio/              ← Audio assets — music beds, sound effects, voiceover
```

## Tech

- **Hyperframes** — video rendering framework built on Remotion (React → MP4)
- Composition-driven: scenes, transitions, text overlays, audio sync
- Render pipeline outputs video files for web embeds, social clips, and email

## Related

- [[10-Projects/auronmedia/_corporate-hub|Auron Media]] — Parent entity, digital creation and video production
- [[10-Projects/mercovaretail/_corporate-hub|Mercova Retail]] — Limited edition products live here
- [[10-Projects/auronmedia/signatures|Signatures]] — Brand identity assets used in intros

## Notes

### 2026-06-12
- Scout run #4: enriched stub with Hyperframes workflow context, Auron→Mercova pipeline, and purpose
- Fixed corporate_entity from "Jungle Media" to "Auron Media"
- P1 priority — directly feeds revenue via limited edition product launches

### 2026-05-18
- Initial hub created from vault corporate alignment
- Hyperframes project — video rendering composition
