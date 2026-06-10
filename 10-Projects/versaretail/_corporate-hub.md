---
name: "Versa Retail"
type: "corporate-hub"
status: "active"
description: "E-commerce and retail platforms — Django-powered storefronts, admin, and API"
path: "/home/projects/versaretail"
tags:
  - corporate-hub
  - versaretail
updated: "2026-05-18"
---

# Versa Retail

E-commerce and retail arm. 7 Django projects powering storefronts, admin panels, APIs, and brand-specific sites.

## Active Projects

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  status AS "Status",
  priority AS "Priority"
FROM "10-Projects/versaretail"
WHERE tags INCLUDES "project" AND status != "archived"
SORT priority ASC
```

## Tech Stack
- Django 5.x + Django REST Framework 3.15+
- Gunicorn
- Standard Django pattern: core/, *\_config/, data/, staticfiles/, templates/

## Projects

- [[10-Projects/versaretail/junglemeditation|Jungle Meditation]] — Meditation brand store
- [[10-Projects/versaretail/junglewear|Jungle Wear]] — Apparel brand store
- [[10-Projects/versaretail/royhudlin|Roy Hudlin]] — Personal brand site
- [[10-Projects/versaretail/versa-admin|Versa Admin]] — Admin panel
- [[10-Projects/versaretail/versa-api|Versa API]] — API service
- [[10-Projects/versaretail/versa-store|Versa Store]] — Main storefront
