---
title: "Corporate Registry"
type: "moc"
tags:
  - moc
  - corporate-registry
updated: "2026-06-19"
---

# Corporate Registry

Fortisyn Corporate Umbrella — 11 entities + 1 external client, fully mapped. The legal scaffolding (trust → holding → operating firewall) is documented in [[40-Resources/holding-company-trust-structure|Holding Company & Trust Structure]].

## Structure

```
Aurora Legacy (Trust)              ← owns the holding company; asset holding & protection
└── Fortisyn (Holding Company)     ← owns all operating subsidiaries
    ├── Innovatience               ← Consulting — primary revenue engine
    │   └── AES Engineering        ← Key client (external)
    ├── Hudlin Services            ← IT infra — networks, VLANs, connectivity
    ├── La Dolce Niente            ← Costa Rica corporation — property owner
    ├── Soleria Technology         ← Home automation — La Dolce testbed
    │   └── website/               ← soleriatechnology.com
    ├── Literary Imprint           ← Publishing — 5 books published
    ├── Auron Media                ← Digital creation & marketing (formerly Jungle Media)
    ├── Python Slayers             ← Software arm — AI, apps, automation
    ├── Roy Hudlin                 ← Personal brand — author, content, social
    │   └── website/               ← royhudlin.com
    └── Mercova Retail             ← White-label store platform (formerly Versa Retail)
        ├── Jungle Meditation      ← Wellness — meditation, breath, destress
        ├── Jungle Wear            ← Apparel
        ├── Roy Hudlin Store       ← Merchandise storefront
        ├── Versa Admin            ← Admin panel
        ├── Versa API              ← API service
        ├── Versa Store            ← Main storefront
        └── website/               ← junglemeditation.com
```

> Note: project files under Mercova Retail still use `versa-*` naming on disk (pre-rebrand) — see the [[10-Projects/mercovaretail/_corporate-hub|Mercova Retail hub]].

## Active Entities

```dataview
TABLE WITHOUT ID
  file.link AS "Entity",
  status AS "Status",
  description AS "Purpose"
FROM "10-Projects"
WHERE tags INCLUDES "corporate-hub"
SORT file.name ASC
```

## All Projects by Entity

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  corporate_entity AS "Entity",
  status AS "Status",
  priority AS "Priority"
FROM "10-Projects"
WHERE tags INCLUDES "project"
SORT file.path ASC
```
