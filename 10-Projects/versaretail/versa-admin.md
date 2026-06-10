---
name: "Versa Admin"
status: "active"
priority: "P2"
corporate_entity: "[[_corporate-hub|Versa Retail]]"
path: "/home/projects/versaretail/versa-admin"
deadline: ""
goals:
  - "Administration panel for Versa Retail operations"
tags:
  - project
  - versaretail
  - django
  - admin
created: "2026-05-18"
updated: "2026-05-18"
---

# Versa Admin

Administration panel for Versa Retail — manage products, orders, inventory across all storefronts.

## Structure

```
versa-admin/
├── core/         ← Django app core
├── corp_config/  ← Corporate-level config
├── data/         ← Data/fixtures
├── staticfiles/  ← Collected static
└── templates/    ← Django templates
```

## Notes

### 2026-05-18
- Initial hub created from vault corporate alignment
