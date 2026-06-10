---
name: "Versa API"
status: "active"
priority: "P1"
corporate_entity: "[[_corporate-hub|Versa Retail]]"
path: "/home/projects/versaretail/versa-api"
deadline: ""
goals:
  - "Central API service for all Versa Retail storefronts"
tags:
  - project
  - versaretail
  - django
  - api
created: "2026-05-18"
updated: "2026-05-18"
---

# Versa API

Central API service powering all Versa Retail storefronts. Django REST Framework 3.16+.

## Structure

```
versa-api/
├── core/        ← Django app core
├── api_config/  ← API-specific config
├── data/        ← Data/fixtures
├── staticfiles/ ← Collected static
└── templates/   ← Django templates
```

## Notes

### 2026-05-18
- Initial hub created from vault corporate alignment
- Uses DRF 3.16 (one minor version ahead of other Versa projects)
