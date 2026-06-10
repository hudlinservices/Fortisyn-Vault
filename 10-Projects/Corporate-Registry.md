---
title: "Corporate Registry"
type: "moc"
tags:
  - moc
  - corporate-registry
updated: "2026-05-18"
---

# Corporate Registry

Fortisyn Corporate Umbrella — 12 entities, fully mapped.

## Structure

```
Fortisyn (Holding Company)
├── Aurora Legacy          ← Trust — asset holding & protection
├── Innovatience           ← Consulting — primary revenue engine
│   └── AES Engineering    ← Key client (external)
├── Hudlin Services        ← IT infra — networks, VLANs, connectivity
├── La Dolce Niente        ← Costa Rica corporation — property owner
├── Soleria Technology     ← Home automation — La Dolce testbed
│   └── website/           ← soleriatechnology.com
├── Literary Imprint       ← Publishing — 5 books published
├── Jungle Media           ← Audio/video, content, social media
├── Python Slayers         ← Software arm — AI, apps, automation
├── Roy Hudlin             ← Personal brand — author, content, social
│   └── website/           ← royhudlin.com
└── Versa Retail           ← E-commerce — Django storefronts
    ├── Jungle Meditation  ← Wellness — meditation, breath, destress
    ├── Jungle Wear        ← Apparel
    ├── Roy Hudlin Store   ← Merchandise storefront
    ├── Versa Admin        ← Admin panel
    ├── Versa API          ← API service
    ├── Versa Store        ← Main storefront
    └── website/           ← junglemeditation.com
```

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
