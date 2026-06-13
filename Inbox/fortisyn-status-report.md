---
title: "Fortisyn Corporate Umbrella — Status Report"
type: "report"
tags:
  - fortisyn
  - status-report
  - corporate
created: "2026-05-19"
agent: "Marketing Agent"
---

# Fortisyn Corporate Umbrella — Status Report

**Generated:** 2026-05-19
**Source:** All corporate hubs, project files, and vault registry

---

## 1. Active Entities and What They Do

Fortisyn is a holding company that owns 12 corporate entities. Here is the full structure:

### Parent
| Entity | Type | Purpose |
|--------|------|---------|
| **Fortisyn** | Holding Company | Top-level parent umbrella. Owns all subsidiary corporations and entities. |

### Subsidiaries (12 active entities)

| # | Entity | Type | What It Does | Filesystem Path |
|---|--------|------|-------------|-----------------|
| 1 | **Aurora Legacy** | Trust Company | Holds and protects assets across the Fortisyn umbrella. Legal/financial entity for asset ownership and estate planning. | `/home/projects/auroralegacy` |
| 2 | **Innovatience** | Consulting | Primary revenue engine. Consulting firm providing PMO, SharePoint, PowerBI, and workflow automation services. Main client: AES Engineering. | `/home/projects/innovatience` |
| 3 | **AES Engineering** *(client, not subsidiary)* | Key Client | Industrial engineering firm. Innovatience client. Active engagement: PMO Setup consulting. | `/home/projects/aesengineering` |
| 4 | **Hudlin Services** | IT Infra | The IT department for all Fortisyn corporations. Runs networks, VLANs, interconnections, cloud services, and hosting infrastructure. | `/home/projects/hudlinservices` |
| 5 | **La Dolce Niente** | Property (CR) | Costa Rica corporation. Owns the home and property. Physical estate. | `/home/projects/ladolceniente` |
| 6 | **Soleria Technology** | Home Automation | Smart home technology company. Testbed is La Dolce Niente property. Productized automations for others. | `/home/projects/soleriatechnology` |
| 7 | **Literary Imprint** | Publishing | Publishing company. Has published 5 books by Roy Hudlin. Handles publication, distribution, rights management. | `/home/projects/literaryimprint` |
| 8 | **Jungle Media** | Media Production | Audio/video production, content creation, media marketing, social media. Creative engine — produces Hyperframes video compositions, audio content, branding. | `/home/projects/junglemedia` |
| 9 | **Python Slayers** | Software Arm | Builds AI-powered applications, automation systems, and full-stack web platforms. | `/home/projects/pythonslayers` |
| 10 | **Roy Hudlin** | Personal Brand | Personal brand of author Roy Hudlin (5 books). Social media content, book snippets, thought leadership. | `/home/projects/royhudlin` |
| 11 | **Versa Retail** | E-Commerce | E-commerce and retail arm. 7 Django projects powering storefronts, admin panels, APIs, and brand-specific sites. | `/home/projects/versaretail` |
| 12 | **Websites** *(no hub file)* | Web Properties | Referenced as a catch-all for website/domain projects. No corporate hub file exists for this entity. | *(not specified)* |

---

## 2. Project Count Per Entity

| Entity | Project Count | Project Names |
|--------|:------------:|---------------|
| **Fortisyn** (holding co) | 0 | Holdings entity — no standalone projects |
| **Aurora Legacy** | 0 | No projects in filesystem (trust admin may be external) |
| **Innovatience** | 2 | Chart of Accounts Pro (P1), Innovatience Website (P3) |
| **AES Engineering** *(client)* | 1 | PMO Setup (P1) |
| **Hudlin Services** | 0 | No projects in filesystem (infra managed directly) |
| **La Dolce Niente** | 0 | No projects in filesystem (property ownership entity) |
| **Soleria Technology** | 1* | Home automation dev (no project file), soleriatechnology.com website (no project file) |
| **Literary Imprint** | 0 | No projects in filesystem (publishing managed externally) |
| **Jungle Media** | 2 | Limited Edition Intro (P1), Signatures (P2) |
| **Python Slayers** | 3 | Chat Assistant (P1), Fortisyn Vault (P1), Spanish Tutor (P2) |
| **Roy Hudlin** | 1 | royhudlin.com (P1) |
| **Versa Retail** | 6 | Jungle Meditation (P1), Jungle Wear (P2), Roy Hudlin Store (P3), Versa Admin (P2), Versa API (P1), Versa Store (P1) |
| **Websites** | 0* | Referenced projects (soleriatechnology.com, junglemeditation.com) may exist but have no hub files |
| **Total** | **16 tracked in vault** | |

> \* Soleria Technology references 2 projects in its corporate hub but neither has a standalone project markdown file yet.
> \* Websites entity has no hub file and its referenced projects lack project files.

---

## 3. Active Code vs Empty Shells

This section evaluates whether the project has actual source code on disk beyond just the vault markdown files.

### ✅ Projects WITH Active Code (code repositories confirmed on disk)

| Project | Entity | Path | Evidence |
|---------|--------|------|----------|
| **Chat Assistant** | Python Slayers | `/home/projects/pythonslayers/chat_assistant/` | backend/, frontend/, deploy/ directories confirmed |
| **Fortisyn Vault** *(this vault)* | Python Slayers | `/home/projects/pythonslayers/fortisyn-vault/` | Active Obsidian vault — this system |
| **Spanish Tutor** | Python Slayers | `/home/projects/pythonslayers/spanish_tutor/` | backend/, frontend/, data/, specs/ directories confirmed |
| **Chart of Accounts Pro** | Innovatience | `/home/projects/innovatience/accounting/` | dist/, public/, src/, tests/, uploads/ directories confirmed; Node.js project |
| **PMO Setup** | AES Engineering | `/home/projects/aesengineering/pmo-setup/` | docs/, flows/, memory/, powerbi/, scripts/ directories confirmed |
| **Limited Edition Intro** | Jungle Media | `/home/projects/junglemedia/limited-edition-intro/` | .hyperframes/ and audio/ directories confirmed |
| **Jungle Meditation** | Versa Retail | `/home/projects/versaretail/junglemeditation/` | Django project — core/, jm_config/, data/, media/, static/, templates/ |
| **Jungle Wear** | Versa Retail | `/home/projects/versaretail/junglewear/` | Django project — core/, jw_config/, data/, media/, static/, templates/ |
| **Roy Hudlin Store** | Versa Retail | `/home/projects/versaretail/royhudlin/` | Django project — core/, roy_config/, data/, logs/, media/, static/, templates/ |
| **Versa Admin** | Versa Retail | `/home/projects/versaretail/versa-admin/` | Django project — core/, corp_config/, data/, staticfiles/, templates/ |
| **Versa API** | Versa Retail | `/home/projects/versaretail/versa-api/` | Django REST Framework project — core/, api_config/, data/, staticfiles/, templates/ |
| **Versa Store** | Versa Retail | `/home/projects/versaretail/versa-store/` | Django project — core/, store_config/, data/, staticfiles/, templates/ |
| **royhudlin.com** | Roy Hudlin | `/home/projects/royhudlin/websites/royhudlin.com/` | backend/, frontend/, image-extract/ directories confirmed |

### ⚠️ Projects That May Be Empty Shells (no code directory OR no project file)

| Project | Entity | Issue |
|---------|--------|-------|
| **Innovatience Website** | Innovatience | Hub notes say "directory exists but needs population — currently empty" |
| **Signatures** | Jungle Media | Hub notes say "directory exists but contents need review" |
| **Home Automation** | Soleria Technology | No dedicated project markdown file; mentioned in corporate hub but no path or status |
| **soleriatechnology.com** | Soleria Technology | Referenced in hub; no project file found |
| **junglemeditation.com** | Versa Retail / Websites | Referenced in Jungle Meditation project; no project file found |

### 🔲 Entities With No Projects in Filesystem

| Entity | Explanation |
|--------|-------------|
| **Aurora Legacy** | Trust administration likely handled externally (legal/financial) |
| **Hudlin Services** | IT infrastructure managed directly on servers/cloud |
| **La Dolce Niente** | Property ownership entity — no code projects needed |
| **Literary Imprint** | Publishing operations likely managed externally |

---

## 4. Recommendations

### 🔴 High Priority — Needs Immediate Attention

1. **Create the Websites corporate hub file** — `10-Projects/websites/_corporate-hub.md` does not exist. Multiple projects (soleriatechnology.com, junglemeditation.com) reference this entity. Without a hub, these projects are untracked orphans.

2. **Build project files for Soleria Technology** — Home automation dev and soleriatechnology.com are referenced in the hub but have no project markdown files. They cannot be tracked, delegated, or reported on.

3. **Evaluate Innovatience Website** — The code directory is empty. If this is needed as a public web presence for the consulting revenue engine, it needs staffing. If deprioritized, mark as such.

### 🟡 Medium Priority — Needs Attention Soon

4. **Review Jungle Media Signatures** — The directory "exists but contents need review." Classify as active or archived.

5. **Create project files for referenced website projects** — `soleriatechnology.com` and `junglemeditation.com` have no standalone project files. If they're active, create them. If deprecated, archive formally.

6. **Add Hudlin Services to active tracking** — As the IT backbone for all entities, even if infrastructure is managed directly, a project hub tracking services, uptime, and connectivity would improve visibility.

### 🟢 Low Priority — Nice to Have

7. **Aurora Legacy & Literary Imprint project templates** — If any aspect of trust administration or publishing is managed digitally (document tracking, rights management), consider creating lightweight project files.

8. **Standardized project metadata** — A few projects have incomplete metadata (missing goals, empty task lists). Consider a sweep to ensure every project has: purpose, at least one goal, and a status.

---

## Summary

| Metric | Count |
|--------|:-----:|
| Total entities | 12 |
| Entities with active projects in vault | 6 (Innovatience, AES Eng, Jungle Media, Python Slayers, Roy Hudlin, Versa Retail) |
| Entities needing project creation | 2 (Soleria Technology, Websites) |
| Entities with no code projects (by nature) | 4 (Aurora Legacy, Hudlin Services, La Dolce Niente, Literary Imprint) |
| Total tracked projects | 16 |
| Projects with active code on disk | 13 ✅ |
| Projects that are empty/questionable shells | 2 (Innovatience Website, Signatures) + 3 missing project files |
| **Code health** | **81% of tracked projects have active code** |


---

## Update: 2026-05-19 — Second Audit (Marketing Agent)

A second survey was conducted on 2026-05-19. The findings above from the first audit are largely confirmed. Key additional findings:

### Additional Findings from This Audit

1. **Roy Hudlin entity found** — Not listed as a subsidiary in the Fortisyn hub, but has a corporate hub at `10-Projects/royhudlin/_corporate-hub.md`. This is a personal brand entity (author of 5 books by Literary Imprint, social media, thought leadership). Has 1 active project: royhudlin.com.

2. **Websites entity confirmed missing** — The Fortisyn hub links to `[[10-Projects/websites/_corporate-hub|Websites]]` but no file exists at that path. 2 projects (soleriatechnology.com, junglemeditation.com) reference it and have no project files.

3. **12 total entities confirmed** — Including Roy Hudlin (personal brand), that makes 12 entities in scope (11 subsidiaries + 1 client).

4. **2 empty-shell projects confirmed**:
   - Innovatience Website — directory exists, empty
   - Signatures (Jungle Media) — directory exists, needs review

5. **2 missing project files**:
   - soleriatechnology.com — referenced from Soleria Technology hub, no file
   - junglemeditation.com — referenced from Jungle Meditation project, no file

### Updated Recommendations

Same as above with these additions:
- **Add Roy Hudlin to Fortisyn hub** — the `_corporate-hub.md` for Fortisyn lists 11 subsidiaries but doesn't include Roy Hudlin
- **Prioritize website project files** — both soleriatechnology.com and junglemeditation.com lack project tracking entirely
