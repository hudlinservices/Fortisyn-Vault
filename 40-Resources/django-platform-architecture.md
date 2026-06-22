---
title: "Django Platform Architecture"
category: "concept"
tags:
  - django
  - architecture
  - platform
  - mercova
  - python-slayers
date: "2026-06-13"
---
# Django Platform Architecture

The shared Django pattern across Fortisyn entities. Mercova Retail runs on it. Python Slayers builds it. Hudlin Services hosts it.

## The Triad Pattern

Every Fortisyn Django platform follows a three-component architecture:

```
         ┌──────────────┐
         │    Store     │  ← Customer-facing (white-label, multi-tenant)
         │  (frontend)  │
         └──────┬───────┘
                │ REST / GraphQL
         ┌──────▼───────┐
         │     API      │  ← Central data layer (DRF 3.16+)
         │   (backend)  │
         └──────┬───────┘
                │
         ┌──────▼───────┐
         │    Admin     │  ← Management dashboard
         │  (internal)  │
         └──────────────┘
```

**Store** talks to **API**. **Admin** talks to **API**. Store and Admin never talk directly. One API, multiple storefronts, one admin.

## Component Responsibilities

| Component | Responsibility | Tech |
|-----------|---------------|------|
| **Store** | Customer UX, product display, cart, checkout, brand theming | Django templates, white-label per brand |
| **API** | Business logic, data validation, auth, inventory, orders | Django REST Framework 3.16+ |
| **Admin** | Product management, order processing, inventory control, merchant dashboard | Django admin + custom views |

## Project Structure

Every Django project in the Fortisyn ecosystem follows this layout:

```
<project>/
├── core/              ← Django app core (models, views, urls)
├── <project>_config/  ← Environment-specific config (settings, wsgi, asgi)
├── data/              ← Fixtures, migrations, seed data
├── staticfiles/       ← Collected static assets (CSS, JS, images)
└── templates/         ← Django templates (storefront, admin, emails)
```

## Stack

| Layer | Choice |
|-------|--------|
| **Framework** | Django 5.x |
| **API** | Django REST Framework 3.15-3.16+ |
| **Server** | Gunicorn |
| **Hosting** | Hudlin Services — see [[40-Resources/cloud-deployment-infrastructure\|Cloud Deployment Infrastructure]] (DOKS/Kubernetes + Cloudflare Tunnel) |
| **Auth** | Django auth + DRF token/session |
| **Static** | WhiteNoise or CDN |
| **Database** | PostgreSQL (standard for Django projects) |

## Active Django Projects

| Project | Entity | Role in Triad |
|---------|--------|---------------|
| [[10-Projects/mercovaretail/versa-store|Mercova Store]] | Mercova Retail | Store (3+ brand storefronts) |
| [[10-Projects/mercovaretail/versa-api|Mercova API]] | Mercova Retail | API (central data layer) |
| [[10-Projects/mercovaretail/versa-admin|Mercova Admin]] | Mercova Retail | Admin (management) |
| [[10-Projects/mercovaretail/junglemeditation|Jungle Meditation]] | Mercova Retail | Brand storefront |
| [[10-Projects/mercovaretail/junglewear|Jungle Wear]] | Mercova Retail | Brand storefront |
| [[10-Projects/mercovaretail/royhudlin|Roy Hudlin Store]] | Mercova Retail | Brand storefront |

## Design Principles

1. **One API, many storefronts** — white-label means each brand gets its own theme, domain, and config, but shares inventory, orders, and user data through a single API
2. **API as single source of truth** — Store and Admin never share a database connection directly. Everything goes through the API
3. **Convention over configuration** — every project uses the same `core/`, `*_config/`, `data/`, `staticfiles/`, `templates/` layout
4. **Python Slayers builds, Hudlin Services hosts** — development and infrastructure are separate concerns

## Related

- [[10-Projects/mercovaretail/_corporate-hub|Mercova Retail]] — The primary Django platform
- [[10-Projects/pythonslayers/_corporate-hub|Python Slayers]] — Builds Django applications
- [[10-Projects/hudlinservices/_corporate-hub|Hudlin Services]] — Kubernetes hosting and infrastructure
- [[10-Projects/innovatience/_corporate-hub|Innovatience]] — Consulting projects (Node.js stack, different pattern)
- [[40-Resources/ecommerce-white-label-retail|E-Commerce & White-Label Retail]] — the *commerce model* this architecture implements (white-label POD)
