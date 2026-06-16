---
title: "Unified Knowledge Graph"
category: "moc"
tags:
  - moc
  - unified
  - cross-vault
  - knowledge-graph
date: "2026-06-15"
---
# Unified Knowledge Graph

Cross-vault map of everything Roy Hudlin / Fortisyn Group knows. Three vaults, one knowledge system.

## Vault Architecture

```
                    ┌──────────────────────────────┐
                    │      Personal Vault           │
                    │  (obsidian/personal-vault)    │
                    │  SLF for ROY · Daily Life     │
                    │  Meditation · Health · Books  │
                    └──────────────┬───────────────┘
                                   │
            ┌──────────────────────┼──────────────────────┐
            │                      │                      │
    ┌───────▼──────┐    ┌─────────▼────────┐    ┌───────▼──────┐
    │Fortisyn Vault │    │  AES Knowledge   │    │  Future:     │
    │(fortisyn-     │    │  Base            │    │  SLF Vault   │
    │ vault)        │    │  (aesengineering/ │    │  (personal-  │
    │Corporate/     │    │  Knowledge Base)  │    │  vault)      │
    │Business       │    │  Work/Client      │    │  Personal AI │
    └───────────────┘    └──────────────────┘    └──────────────┘
```

---

## Layer 1 — Corporate Structure (Fortisyn Vault)

### Parent Entity
- **Fortisyn Group** — holding company, 11 subsidiaries

### Entities

| # | Entity | Function | URL |
|---|--------|----------|-----|
| 1 | **Auron Media** | Digital creation & marketing | auron.media |
| 2 | **Aurora Legacy** | Trust — asset holding | auroralegacy.com |
| 3 | **Hudlin Services** | Managed IT & Networking | hudlinservices.com |
| 4 | **Innovatience** | Technical Systems Consulting | innovatience.ca |
| 5 | **La Dolce Niente** | Property & Asset Acquisition | ladolceniente.com |
| 6 | **Literary Imprint** | Digital Publishing | literaryimprint.com |
| 7 | **Mercova Retail** | White-label Store Platform | mercovaretail.com |
| 8 | **Python Slayers** | Software Arm | pythonslayers.com |
| 9 | **Roy Hudlin** | Personal Brand | royhudlin.com |
| 10 | **Soleria Technology** | Smart Home Automation | solariatechnology.com |
| 11 | **Fortisyn** | Parent Holding Company | — |

### Key External Client
- **AES Engineering Ltd** — electrical/lighting/technology consulting. Primary revenue source via Innovatience. → Has its own vault: **AES Knowledge Base**

### Internal Dependencies
```
Hudlin Services ──IT backbone──► ALL entities
Python Slayers  ──software────► ALL entities
Auron Media     ──creative────► ALL entities
Innovatience    ──revenue─────► Fortisyn Group (funds everything via AES)
La Dolce Niente ──testbed────► Soleria Technology
Literary Imprint──publishes──► Roy Hudlin (5 books)
```

---

## Layer 2 — Work / Client (AES Knowledge Base)

### AES Engineering Projects (7 active)

| # | Project | Domain |
|---|---------|--------|
| 1 | **360 Camera Info** | Construction tech — Ricoh Theta Z1 + OpenSpace |
| 2 | **Building Intercom Systems** | Market research — 10 competitors, 3 tiers |
| 3 | **Granville Loops ESS** | Electronic security — VMS, ACS, IDS |
| 4 | **Library Square** | RFI review — construction spec response |
| 5 | **Parkade Entrance** | Gate control — LPR, RFID, QR, Bluetooth |
| 6 | **PMO Setup** | SharePoint PMO — tasks, time, risk, PowerBI |
| 7 | **Providence Health** | Server commissioning MOP review — 6 findings |

### Research & Presentations
- 360 Camera Setup Research — 5 cameras, 6 platforms, cost models
- Executive Presentation — 16 slides, C-suite deck
- 309 ChatGPT-imported facts about AES Engineering

### Revenue Flow
```
AES Engineering Ltd (client)
        │ pays
        ▼
Innovatience (Fortisyn entity)
        │ funds
        ▼
Fortisyn Group → all 10 other entities
```

---

## Layer 3 — Knowledge Infrastructure (Fortisyn Vault)

### Agents

| Agent | Function | Status |
|-------|----------|--------|
| **Auron Agent** | Social media content — 6 brands, Buffer MCP | Ready |
| **Knowledge Scout** | Gap detection + research via NotebookLM | Active (7 runs) |
| **Social Media Agent** | Legacy — superseded by Auron Agent | Dormant |

### Skills

| Skill | Purpose |
|-------|---------|
| `/scout` | Autonomous knowledge gap research |
| `/new-project` | One-command project initialization |
| `/social-media` | Content creation via Auron Agent |
| `/pi-fleet` | Raspberry Pi fleet management |

### Automation
- **Daily 3:07 AM** — Auto-ingest from Vault Ingest notebook
- **Daily 4:13 AM** — Knowledge Scout gap scan
- **Pi Fleet** — plex1, plex2, sickchill, transmission, transmission2

### Concept Pages

| Domain | Pages |
|--------|-------|
| **Marketing** | Copywriting, Email Marketing, SEO Fundamentals, Growth Hacking, Social Media Marketing |
| **Technology** | Hyperframes, Django Platform Architecture, SFF LLM Build |
| **Knowledge Mgmt** | LLM Wiki, RAG vs Wiki, Three-Layer Architecture, Wiki Operations, Index-Log Pattern |

---

## Layer 4 — Personal (Personal Vault — Empty)

### Planned: SLF for ROY
- Personal AI companion — tutor, coach, assistant, mentor
- Django + React PWA at `/home/personal/slf/`
- Personal knowledge vault separate from Fortisyn

### Roy Hudlin — Personal Identity
- MindTechArt: mindfulness + creativity + technology
- 5 books across 3 series (Mindful Way, Costa Rica Poetry, Children's)
- Photographic poetry: Embers of the Golden Hour, Where Ocean Meets Jungle, Sunset's Promise
- Meditation teacher, Narrative Alchemy concept

---

## Cross-Vault Navigation

```
Question about a company?       → Fortisyn Vault (10-Projects/<entity>/)
Question about AES work?        → AES Knowledge Base
Question about Roy personally?  → Personal Vault (empty — SLF not yet built)
Question about methodology?     → Fortisyn Vault (40-Resources/)
Question about infrastructure?  → Fortisyn Vault (pi-fleet, SFF build)
```

---

## Knowledge Gaps

| # | Gap | Where |
|---|-----|-------|
| 1 | Personal vault empty — SLF for ROY content not yet migrated | Personal Vault |
| 2 | AES identity: industrial vs electrical/technology | Fortisyn Vault |
| 3 | 309 ChatGPT AES facts not cross-referenced with Fortisyn entities | Both |
| 4 | No daily notes since June 13 | Fortisyn Vault |

---

## Stats

| Vault | Files | Entities | Projects | Last Active |
|-------|-------|----------|----------|-------------|
| Fortisyn Vault | 212 | 11 corporate + 1 client | 20+ | 2026-06-15 |
| AES Knowledge Base | 27 | 1 client | 7 | 2026-06-15 |
| Personal Vault | 0 | 1 person | 1 (SLF) | — |

---

*This page is the cross-vault map. Each vault also has its own `index.md` and `log.md`.*
