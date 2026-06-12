---
name: "Mercova Admin"
status: "active"
priority: "P2"
corporate_entity: "[[_corporate-hub|Mercova Retail]]"
path: "/home/projects/versaretail/versa-admin"
goals:
  - "Administration dashboard for Mercova Retail — manage products, orders, inventory across all storefronts"
tags:
  - project
  - mercovaretail
  - django
  - admin
created: "2026-05-18"
updated: "2026-06-12"
---
# Mercova Admin

**Administration dashboard for Mercova Retail.** Central control panel for managing products, orders, and inventory across all white-label storefronts.

Part of the Mercova platform triad: **Store** (customer-facing) → **API** (backend services) → **Admin** (management dashboard).

## Structure

```
versa-admin/          ← dir still uses old name (rename pending)
├── core/             ← Django app core
├── corp_config/      ← Corporate-level config
├── data/             ← Data/fixtures
├── staticfiles/      ← Collected static
└── templates/        ← Django templates
```

## Role in Mercova Architecture

```
                  ┌──────────────┐
                  │  Mercova     │
                  │  Admin       │
                  │  (manage)    │
                  └──────┬───────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼─────┐   ┌─────▼────┐   ┌─────▼────┐
    │ Jungle   │   │ Jungle   │   │  Roy     │
    │ Meditation│  │ Wear     │   │  Hudlin  │
    │ Store    │   │ Store    │   │  Store   │
    └──────────┘   └──────────┘   └──────────┘
```

Merchants log into Admin to manage inventory, process orders, and configure their white-label storefront across all brand sites.

## Related

- [[10-Projects/mercovaretail/_corporate-hub|Mercova Retail]] — Parent entity, white-label store platform
- [[10-Projects/mercovaretail/versa-api|Mercova API]] — Backend services powering the admin
- [[10-Projects/mercovaretail/versa-store|Mercova Store]] — Customer-facing storefront engine
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — Hosting and infrastructure

## Notes

### 2026-06-12
- Scout run #4: rebranded from "Versa Admin" to "Mercova Admin" in content and cross-references
- Added architecture context showing how Admin fits in the Mercova triad
- Directory on disk and filename still `versa-admin/` — rename pending

### 2026-05-18
- Initial hub created from vault corporate alignment
