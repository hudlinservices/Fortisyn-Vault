---
name: "Mercova Store"
status: "active"
priority: "P1"
corporate_entity: "[[_corporate-hub|Mercova Retail]]"
path: "/home/projects/versaretail/versa-store"
goals:
  - "Main Mercova Retail storefront — the flagship white-label e-commerce experience"
tags:
  - project
  - mercovaretail
  - django
  - ecommerce
created: "2026-05-18"
updated: "2026-06-12"
---
# Mercova Store

**Main Mercova Retail storefront engine.** The flagship customer-facing e-commerce experience. Powers white-label stores for branded merchandise — "Your Website. Your Merch. Done."

Part of the Mercova platform triad: **Store** (customer-facing) → **API** (backend services) → **Admin** (management dashboard).

## Structure

```
versa-store/          ← dir still uses old name (rename pending)
├── core/             ← Django app core
├── store_config/     ← Store-specific config
├── data/             ← Data/fixtures
├── staticfiles/      ← Collected static
└── templates/        ← Django templates
```

## Brand Storefronts Powered by Store

| Storefront | Brand | URL |
|-----------|-------|-----|
| [[10-Projects/mercovaretail/junglemeditation\|Jungle Meditation]] | Meditation & wellness | junglemeditation.com |
| [[10-Projects/mercovaretail/junglewear\|Jungle Wear]] | Apparel | — |
| [[10-Projects/mercovaretail/royhudlin\|Roy Hudlin Store]] | Personal brand merchandise | — |

## Role in Mercova Architecture

```
    ┌──────────────────────────────────┐
    │        Mercova Store              │
    │   (white-label storefront engine) │
    └──────────────────────────────────┘
         │         │         │
    ┌────▼──┐ ┌───▼───┐ ┌──▼──────┐
    │Jungle │ │Jungle │ │  Roy    │
    │Medita-│ │ Wear  │ │ Hudlin  │
    │tion   │ │       │ │         │
    └───────┘ └───────┘ └─────────┘
         │         │         │
         └─────────┼─────────┘
                   │
            ┌──────▼──────┐
            │  Mercova API│
            │    (DRF)    │
            └─────────────┘
```

One Store engine, multiple branded storefronts. Each brand gets its own domain and theme. All share the same cart, inventory, and order infrastructure via the API.

## Related

- [[10-Projects/mercovaretail/_corporate-hub|Mercova Retail]] — Parent entity, white-label store platform
- [[10-Projects/mercovaretail/versa-api|Mercova API]] — Backend services (data layer)
- [[10-Projects/mercovaretail/versa-admin|Mercova Admin]] — Management dashboard
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — Hosting and infrastructure
- [[10-Projects/auronmedia/_corporate-hub|Auron Media]] — Branding and creative for storefronts

## Notes

### 2026-06-12
- Scout run #4: rebranded from "Versa Store" to "Mercova Store" in content and cross-references
- Added architecture diagram showing Store → API → Admin triad
- Directory on disk and filename still `versa-store/` — rename pending

### 2026-05-18
- Initial hub created from vault corporate alignment
