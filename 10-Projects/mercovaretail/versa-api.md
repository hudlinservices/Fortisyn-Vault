---
name: "Mercova API"
status: "active"
priority: "P1"
corporate_entity: "[[_corporate-hub|Mercova Retail]]"
path: "/home/projects/versaretail/versa-api"
goals:
  - "Central API service for all Mercova Retail storefronts and admin"
tags:
  - project
  - mercovaretail
  - django
  - api
created: "2026-05-18"
updated: "2026-06-12"
---
# Mercova API

**Central API service for Mercova Retail.** Django REST Framework 3.16+ backend powering all storefronts and the admin dashboard. The data backbone of the white-label platform.

Part of the Mercova platform triad: **Store** (customer-facing) → **API** (backend services) → **Admin** (management dashboard).

## Structure

```
versa-api/            ← dir still uses old name (rename pending)
├── core/             ← Django app core
├── api_config/       ← API-specific config
├── data/             ← Data/fixtures
├── staticfiles/      ← Collected static
└── templates/        ← Django templates
```

## Role in Mercova Architecture

```
    ┌──────────┐     ┌──────────┐     ┌──────────┐
    │ Jungle   │     │ Jungle   │     │  Roy     │
    │ Meditation│    │ Wear     │     │  Hudlin  │
    │ Store    │     │ Store    │     │  Store   │
    └────┬─────┘     └────┬─────┘     └────┬─────┘
         │               │               │
         └───────────────┼───────────────┘
                         │
                   ┌─────▼────┐
                   │ Mercova  │
                   │   API    │
                   │ (DRF)    │
                   └─────┬────┘
                         │
                   ┌─────▼────┐
                   │ Mercova  │
                   │  Admin   │
                   │ (manage) │
                   └──────────┘
```

All storefronts talk to one API. The API handles product catalog, orders, inventory, and user data. Admin reads/writes through the same API endpoints.

## Tech

- Django REST Framework 3.16+
- One minor version ahead of other Mercova Django projects

## Related

- [[10-Projects/mercovaretail/_corporate-hub|Mercova Retail]] — Parent entity, white-label store platform
- [[10-Projects/mercovaretail/versa-store|Mercova Store]] — Customer-facing storefront (API consumer)
- [[10-Projects/mercovaretail/versa-admin|Mercova Admin]] — Management dashboard (API consumer)
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — Hosting and infrastructure

## Notes

### 2026-06-12
- Scout run #4: rebranded from "Versa API" to "Mercova API" in content and cross-references
- Added architecture diagram showing API as central data layer between Store and Admin
- Directory on disk and filename still `versa-api/` — rename pending

### 2026-05-18
- Initial hub created from vault corporate alignment
- Uses DRF 3.16 (one minor version ahead of other Versa projects)
