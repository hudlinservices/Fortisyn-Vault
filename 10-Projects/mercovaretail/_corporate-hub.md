---
name: "Mercova Retail"
type: "corporate-hub"
status: "active"
description: "White-label store platform — sell branded merchandise directly on your site. Formerly Versa Retail."
parent: "[[10-Projects/fortisyn/_corporate-hub|Fortisyn]]"
path: "/home/projects/versaretail"
url: "https://mercovaretail.com"
tags:
  - corporate-hub
  - mercovaretail
  - versaretail
updated: "2026-06-09"
---
# Mercova Retail

**Your Website. Your Merch. Done.** White-label store platform that lets brands sell branded merchandise directly on their own sites. The e-commerce and retail arm of the Fortisyn Group.

**URL:** [mercovaretail.com](https://mercovaretail.com)

## Rebrand: Versa Retail → Mercova Retail

Mercova Retail was formerly **Versa Retail** (broad e-commerce arm with 7 Django projects). The rebrand represents a strategic narrowing:

| Dimension | Versa Retail (old) | Mercova Retail (new) |
|-----------|-------------------|---------------------|
| Positioning | E-commerce and retail arm | White-label store platform |
| Tagline | — | "Your Website. Your Merch. Done." |
| Focus | Broad e-commerce (storefronts, admin, API) | Branded merchandise on client sites |
| Model | General e-commerce platform | Specialized white-label solution |

## Platform Architecture

Seven Django projects power the platform:

| Component | Old Name | Purpose |
|-----------|----------|---------|
| **Store** | versa-store | Customer-facing storefront engine |
| **Admin** | versa-admin | Store management and administration |
| **API** | versa-api | Backend data exchange and services |

## Brand Storefronts

- [[10-Projects/mercovaretail/junglemeditation|Jungle Meditation]] — Meditation and wellness brand
- [[10-Projects/mercovaretail/junglewear|Jungle Wear]] — Apparel brand
- [[10-Projects/mercovaretail/royhudlin|Roy Hudlin]] — Personal brand merchandise

## The Business Model

White-label print-on-demand merch — *what* Mercova sells and how the economics work (POD zero-inventory fulfillment, the 2026 platform landscape, payment processing, multi-tenant storefronts) — is documented in **[[40-Resources/ecommerce-white-label-retail|E-Commerce & White-Label Retail]]**. The *software* that implements it is [[40-Resources/django-platform-architecture|Django Platform Architecture]]. Mercova is the second arm of Fortisyn's content-to-commerce pipeline; books are the [[40-Resources/digital-publishing-self-publishing|first arm]].

## Tech Stack

- Django 5.x + Django REST Framework 3.15+
- Gunicorn
- Standard Django pattern: `core/`, `*_config/`, `data/`, `staticfiles/`, `templates/`

## Active Projects

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  status AS "Status",
  priority AS "Priority"
FROM "10-Projects/mercovaretail"
WHERE tags INCLUDES "project" AND status != "archived"
SORT priority ASC
```

## Related Entities

- [[10-Projects/fortisyn/_corporate-hub|Fortisyn]] — Parent holding company
- [[10-Projects/auronmedia/_corporate-hub|Auron Media]] — Branding and creative for storefronts
- [[10-Projects/pythonslayers/_corporate-hub|Python Slayers]] — Software development (Django apps)
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — Hosting and infrastructure

## Notes

### 2026-06-09
- Scout research: documented rebrand from Versa Retail to Mercova Retail based on mercovaretail.com site and NotebookLM synthesis
- Directory on disk still `versaretail/` — rename pending
- Project files (versa-admin, versa-api, versa-store) still use old naming — rename pending
- mercovaretail.com is a React SPA; description extracted from page meta

### 2026-05-18
- Previously documented as Versa Retail — e-commerce arm with 7 Django projects
