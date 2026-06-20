---
title: "Gap Priorities"
date: "2026-06-09"
category: research
tags:
  - research
  - gaps
  - priorities
---
# Gap Priorities

Running list of knowledge gaps identified but not yet filled. Updated by Knowledge Scout after each run. Prevents re-researching the same gaps.

## Unresearched (priority order)

*All 14 original gaps + the 2026-06-13 lint recommendations resolved. New gaps below as the vault grows.*

| Priority | Gap | Notes |
|----------|-----|-------|
| Med | 30 uncataloged root-level ChatGPT conversations | `chatgpt-conversations/*.md` (root, not under an entity subdir) — e.g. `book-setup-on-kdp`, `jungle-meditation`, `mindtechart---website`, `corporate-structure-with-trust`, `costa-rica-book-promo`, `influencer:-siena-wilder`, `roy.md`. They're documented by title in [[40-Resources/chatgpt-conversation-index\|chatgpt-conversation-index]] but not filed into entity subdirs like the other 85. **Navigation/filing gap, not research** — handle in a lint/filing pass (move to `chatgpt-conversations/<entity>/`). Moving 30 files autonomously is a destructive-ish gate; defer to a run with human present or a dedicated filing task. |
| Med | Costa Rica specifics needing Roy's input | New page [[40-Resources/costa-rica\|Costa Rica]] is synthesized from general 2026 guides. Confirm: which entity (S.R.L. vs S.A.) Costa Rica ops use; La Dolce Niente fiber availability; current residency/visa status; how Fortisyn/Aurora Legacy bank locally given holding-company banking caveat. Human-input gap, not web research. |
| Low | NotebookLM auth dead 5 cron runs | `No cookies found` on 2026-06-15, -16, -17, -19, -20. Needs `npx oneclicklm login` re-run by Roy (interactive). Until then, web tools are the primary cron research path (skill prerequisite updated). Documented in [[40-Resources/model-context-protocol\|MCP page]] as a credential, not protocol, failure. |
| Low | "Industrial engineering" label on Innovatience hub | Innovatience hub still calls AES "industrial engineering" — contradicts [[40-Resources/security-systems-consulting\|systems-consulting]] + AES page (electrical/lighting/technology). Tied to AES identity-confirmation gap below. |
| Low | AES Engineering firm identity confirmation | Identified as AES Engineering Ltd (aesengr.com) from context; vault calls it "industrial engineering" but firm is electrical/technology. Needs Roy's confirmation — see ⚠️ on the AES page. |
| Low | 16 stale May pages | Lint rec #4 — archive or refresh. Lint job, not scout research. |

## Researched

| Date | Gap | Result Pages |
|------|-----|-------------|
| 2026-06-20 | Obsidian / PKM stack — the vault's substrate, named in 22+ pages, no concept page | [[40-Resources/obsidian-pkm-stack\|Obsidian & the Knowledge-Management Stack]] — local-first/Markdown/links mapped to CLAUDE.md principles, four-plugin stack, Dataview-LLM caveat |
| 2026-06-20 | Claude Code — the agent host that runs scout/lint/ingest, no page (5+ pages) | [[40-Resources/claude-code\|Claude Code & AI-Assisted Development]] — agentic CLI, third leg of the agent trilogy, MCP host; ⚠️ two-agent-systems clarification |
| 2026-06-20 | Mindfulness & meditation — practice domain behind the wellness side (18+ pages) | [[40-Resources/mindfulness-meditation-practice\|Mindfulness & Meditation Practice]] — meditation/breathwork/flow evidence, flow→Tech-pillar bridge; plus Jungle Meditation stale fix |
| 2026-06-19 | Holding company & trust structure — corporate/legal backbone undocumented (17+ pages reference it) | [[40-Resources/holding-company-trust-structure\|Holding Company & Trust Structure]] — trust→holding→operating firewall, irrevocable-trust principle, no-"Hudlin" naming, Fortisyn map; ⚠️ revocable-trust caveat |
| 2026-06-19 | Model Context Protocol — agentic-OS integration layer, no page (12+ pages) | [[40-Resources/model-context-protocol\|Model Context Protocol (MCP)]] — hosts/clients/servers, JSON-RPC, tools/resources/prompts; OneClickLM as producer, scout as consumer |
| 2026-06-19 | Agentic orchestration / agent runtime — principle #6 implemented in code, no concept page | [[40-Resources/agentic-orchestration\|Agentic Orchestration & Agent Runtime]] — the loop, three-gate model, locking, resumable run logs, 6 agents, 2026 HITL context |
| 2026-06-19 | Corporate Registry stale (Jungle Media/Versa Retail, "12 entities") + lint-2026-06-15 uncataloged | Corporate Registry rewritten (current names, 11+1, trust/holding root); lint-2026-06-15 catalogued in index.md |
| 2026-06-17 | Cloud deployment/hosting — "Kubernetes clusters" undocumented (connects Hudlin↔Python Slayers↔Django↔apps) | [[40-Resources/cloud-deployment-infrastructure\|Cloud Deployment & Hosting Infrastructure]] — DOKS, Helm, namespaces, HPA, Cloudflare Tunnel (zero-trust, CGNAT) |
| 2026-06-17 | Network architecture — Ubiquiti/UniFi platform, no concept page; lab-network stub | [[40-Resources/network-architecture\|Network Architecture]] — UDM-Pro/Dream Wall, 802.1Q VLAN, ui.com remote mgmt, Starlink WAN; enriched lab-network |
| 2026-06-17 | Home automation stack — Soleria's foundation undocumented | [[40-Resources/home-automation-stack\|Home Automation Stack]] — Home Assistant, Z-Wave/Zigbee/Matter/Thread (2026), IoT VLAN, R&D loop |
| 2026-06-16 | Costa Rica — relocation/business/tech hub (connects 14+ pages) | [[40-Resources/costa-rica\|Costa Rica]] — digital nomad visa, territorial tax, S.A./S.R.L. setup, fiber infrastructure, cost of living; open questions flagged for Roy |
| 2026-06-16 | MindTechArt — personal-brand framework, no concept page (11+ pages) | [[40-Resources/mindtechart\|MindTechArt]] — Mind/Tech/Art pillars, calm-technology grounding (Amber Case), brand application |
| 2026-06-16 | Security/low-voltage systems consulting — Roy's technical domain | [[40-Resources/security-systems-consulting\|Low-Voltage & Security Systems Consulting]] — MasterFormat Div 27/28, acronym glossary, consulting workflow, Fortisyn revenue link |
| 2026-06-16 | 5 uncataloged ChatGPT-import pages + social-media-agent (navigation) | index.md + hub backlinks (Roy Hudlin, Innovatience, Auron Media) — all now cataloged and cross-linked |
| 2026-06-09 | Fortisyn Group — corporate structure and strategy | [[10-Projects/fortisyn/_corporate-hub\|Fortisyn hub]] — group architecture, synergy model, subsidiary table with URLs |
| 2026-06-09 | Jungle Media → Auron Media rebrand | [[10-Projects/auronmedia/_corporate-hub\|Auron Media hub]] — full rebrand, services, comparison table, auron.media |
| 2026-06-09 | Versa Retail → Mercova Retail rebrand + platform architecture | [[10-Projects/mercovaretail/_corporate-hub\|Mercova Retail hub]] — rebrand, white-label platform, architecture, mercovaretail.com |
| 2026-06-09 | La Dolce Niente — repositioning + URL | [[10-Projects/ladolceniente/_corporate-hub\|La Dolce Niente hub]] — property & asset acquisition, ladolceniente.com |
| 2026-06-09 | Python Slayers — URL | [[10-Projects/pythonslayers/_corporate-hub\|Python Slayers hub]] — pythonslayers.com |
| 2026-06-09 | Roy Hudlin personal brand — 5 books, MindTechArt, URL | [[10-Projects/royhudlin/_corporate-hub\|Roy Hudlin hub]] — 4 of 5 books, MindTechArt framework, photographic poetry, royhudlin.com |
| 2026-06-09 | Literary Imprint — publishing model, book titles, URL | [[10-Projects/literaryimprint/_corporate-hub\|Literary Imprint hub]] — DIY/DFY model, 4 of 5 books, services, literaryimprint.com |
| 2026-06-09 | Hudlin Services — services, infrastructure stack, URL | [[10-Projects/hudlinservices/_corporate-hub\|Hudlin Services hub]] — service catalog, Kubernetes/VLAN/failover stack, hudlinservices.com |
| 2026-06-09 | Aurora Legacy — URL (bonus) | [[10-Projects/auroralegacy/_corporate-hub\|Aurora Legacy hub]] — auroralegacy.com |
| 2026-06-09 | Innovatience — consulting focus, URL, client details | [[10-Projects/innovatience/_corporate-hub\|Innovatience hub]] — Technical Systems Consulting, AES Engineering client, innovatience.ca |
| 2026-06-09 | Soleria Technology — smart home automation, URL | [[10-Projects/soleriatechnology/_corporate-hub\|Soleria Technology hub]] — smart home products, R&D testbed loop, solariatechnology.com |
| 2026-06-09 | Signatures — brand identity system (stub enrichment) | [[10-Projects/auronmedia/signatures\|Signatures page]] — 7 brand components, entity-organized asset library, Fortisyn-wide scope |
| 2026-06-12 | Versa → Mercova stale references + architecture concept | [[10-Projects/mercovaretail/versa-admin\|Mercova Admin]], [[10-Projects/mercovaretail/versa-api\|Mercova API]], [[10-Projects/mercovaretail/versa-store\|Mercova Store]] — rebranded, architecture diagrams (Store→API→Admin triad) |
| 2026-06-12 | Limited Edition Intro — Hyperframes stub enrichment | [[10-Projects/auronmedia/limited-edition-intro\|Limited Edition Intro]] — Hyperframes workflow, Auron→Mercova pipeline, P1 context |
| 2026-06-12 | Directory renames + all wikilinks updated | `junglemedia/`→`auronmedia/`, `versaretail/`→`mercovaretail/` — directories moved, all vault wikilinks updated |
| 2026-06-12 | Roy Hudlin book #5 title confirmed | [[10-Projects/royhudlin/_corporate-hub\|Roy Hudlin hub]] — *Sloth Adventures: Hank Gets Lost*, first of planned children's trilogy |
| 2026-06-13 | Hyperframes concept page | [[40-Resources/hyperframes\|Hyperframes]] — video framework, capabilities, Fortisyn pipeline, 13 related skills |
| 2026-06-13 | Django platform architecture | [[40-Resources/django-platform-architecture\|Django Platform Architecture]] — Store→API→Admin triad, conventions, all 6 active projects |
| 2026-06-13 | Daily capture habit restarted | [[00-Dashboard/daily/2026-06-13\|2026-06-13]] — first daily note in 18 days |
| 2026-06-13 | /new-project skill | `~/.claude/skills/new-project/SKILL.md` — one-command project initialization |
| 2026-06-13 | SLF for ROY — missing project page | [[10-Projects/pythonslayers/slf-for-roy\|SLF for ROY]] — AI companion, Django + React PWA |
| 2026-06-13 | Chat Assistant + Spanish Tutor stubs enriched | [[10-Projects/pythonslayers/chat-assistant\|Chat Assistant]], [[10-Projects/pythonslayers/spanish-tutor\|Spanish Tutor]] — personal projects ecosystem |
| 2026-06-13 | Second lint pass | [[Inbox/lint-2026-06-13\|Lint Report]] — 16 stale pages, 2 missing, specs/ discovered |
| 2026-06-15 | AES Engineering — missing client page (connects 5+ pages, broken links) | [[10-Projects/aesengineering/_corporate-hub\|AES Engineering]] — electrical/lighting/technology firm, Innovatience client, revenue engine; contradiction flagged |
| 2026-06-15 | social-media-automation skill — broken Auron Agent link | [[20-Skills/marketing/social-media-automation\|Social Media Automation]] — Buffer workflow, approval gate, 2026 best practices |
| 2026-06-15 | Social Media Marketing — missing 5th marketing pillar | [[40-Resources/marketing/social-media-marketing\|Social Media Marketing]] — platforms, content strategy, connects to email/SEO/copywriting/growth |
