---
title: "Accounting, Bookkeeping & Multi-Entity Finance"
category: concept
tags:
  - accounting
  - bookkeeping
  - finance
  - tax
  - cra
  - holding-company
  - monetization
source: "WebSearch 2026-06-22 — enkel.ca/outsourcebookkeeping.ca chart-of-accounts guides, mackisen.com SBD 2026, accplus.ca intercompany; grounded in chatgpt-conversations/innovatience finance corpus"
date: "2026-06-22"
---
# Accounting, Bookkeeping & Multi-Entity Finance

The financial backbone beneath all 11 Fortisyn entities — how money is tracked, how the entities pay each other, and how Canadian + Costa Rican tax shapes the whole structure. The vault has an *application* ([[10-Projects/innovatience/accounting|Chart of Accounts Pro]]) and a deep ChatGPT finance corpus (CRA passive income, GST/payroll, single-client rules, salary-vs-corporation) but no page tying the *finance domain* together. This is that page — the standalone counterpart to the two revenue arms ([[40-Resources/digital-publishing-self-publishing|Publishing]], [[40-Resources/ecommerce-white-label-retail|E-Commerce]]). All revenue eventually lands here.

It sits directly atop the [[40-Resources/holding-company-trust-structure|Holding Company & Trust Structure]]: that page explains the *legal* firewall (trust → holding → operating); this one explains the *accounting and tax* that flows through it.

## The Chart of Accounts

Every entity's books rest on a **chart of accounts** — the structured list of every financial account, grouped into five categories: **Assets, Liabilities, Equity, Revenue, Expenses.** In Canada it must support CRA recordkeeping and **GST/HST** reporting. This is exactly what [[10-Projects/innovatience/accounting|Chart of Accounts Pro]] (the Innovatience Node.js app) implements — the vault built the tool before it documented the concept.

For a multi-entity group like Fortisyn, the practical pattern is **a consistent chart of accounts across every entity** so books can be consolidated, with each operating company, the holding company, and the trust keeping separate ledgers that roll up.

## Canadian Corporate Tax — The Rules That Actually Bind Fortisyn

Roy's own finance conversations (filed under [[chatgpt-conversations/innovatience/|Innovatience]]) map onto specific CRA rules:

**Small Business Deduction (SBD) — shared, not per-entity.**
- A CCPC gets a low tax rate on its first **$500,000** of active business income (the SBD).
- ⚠️ **Associated corporations share ONE $500,000 limit** (ITA s.125(3)) — *not* $500k each. Fortisyn's many CCPCs, if associated through common control, divide a single SBD. This is the single most important multi-entity tax fact and a reason the group structure must be deliberate.
- **2026 change:** CRA now mandates **Form T2SCH23A** to declare related-party structures; failure to disclose can suspend SBD eligibility. (Grounds the [[chatgpt-conversations/innovatience/single-client-corporation-rules|single-client-corporation-rules]] question.)

**Passive income grinds the SBD.**
- When a CCPC + associated corps earn **$50k–$150k of passive investment income**, the $500k business limit is reduced straight-line (gone at $150k). This is the **"CRA 50% passive income"** concern in [[chatgpt-conversations/innovatience/cra-passive-income-tax|cra-passive-income-tax]].
- Mitigation: keep investment activity (rent, dividends, interest) **in the holding company** — see [[40-Resources/holding-company-trust-structure|holding/trust structure]] — to protect the operating company's SBD.

**Intercompany transactions** (how the entities pay each other):
- Inter-corporate dividends (s.112(1)) and loans (s.17) move money between Fortisyn entities; **management fees** (e.g. Hudlin Services billing each entity for IT) must be **reasonable and documented** — time, resources, market rate — or CRA disallows them.

**GST + Payroll** ([[chatgpt-conversations/innovatience/gst-number-and-payroll-setup|gst-number-and-payroll-setup]]):
- A **GST/HST number** is required once revenue crosses the threshold; a **payroll deductions account** is required to pay salaries (CPP/EI/income tax remittances).

**Salary vs. dividends** ([[chatgpt-conversations/innovatience/salary-vs-corporation-payments|salary-vs-corporation-payments]], 68 msgs — the richest):
- The contractor-via-corporation decision: take a **salary** (deductible to the corp, creates RRSP room, requires payroll remittances) vs. **dividends** (no payroll, but no RRSP/CPP). Roy's case: $120k, BC-incorporated, working remotely from Costa Rica with home-office deductions.

## The Costa Rica Layer

Roy intends to **reside in Costa Rica while staying a Canadian tax resident** ([[chatgpt-conversations/innovatience/salary-vs-corporation-payments|see convo]]). This intersects [[40-Resources/costa-rica|Costa Rica]]'s **territorial tax** (0% on foreign-source income) — but Canadian residency means Canadian worldwide taxation still applies. Home-office costs in Costa Rica (internet, heat, water, workspace) become corporate deductions.

> ⚠️ **Open for Roy (carried from the [[40-Resources/costa-rica|Costa Rica]] page):** the dual Canada/Costa-Rica residency tax position is a real planning question, not settled fact — confirm with a cross-border accountant. The vault records the *intent*, not professional tax advice.

## How This Connects the Whole Vault

This page is the **high-connectivity hub of the monetization backbone**:
- **Revenue in:** [[40-Resources/digital-publishing-self-publishing|book royalties]] + [[40-Resources/ecommerce-white-label-retail|merch sales]] + [[10-Projects/innovatience/_corporate-hub|Innovatience consulting]] (the revenue engine, via [[10-Projects/aesengineering/_corporate-hub|AES]]).
- **Structure:** flows through the [[40-Resources/holding-company-trust-structure|trust → holding → operating]] firewall.
- **Tooling:** tracked in [[10-Projects/innovatience/accounting|Chart of Accounts Pro]].
- **Geography:** shaped by [[40-Resources/costa-rica|Costa Rica]] residency + territorial tax.

## Related

- [[40-Resources/holding-company-trust-structure|Holding Company & Trust Structure]] — the legal firewall this accounting flows through
- [[10-Projects/innovatience/accounting|Chart of Accounts Pro]] — the app that implements the chart of accounts
- [[40-Resources/costa-rica|Costa Rica]] — territorial tax + dual-residency layer
- [[40-Resources/digital-publishing-self-publishing|Digital Publishing]] / [[40-Resources/ecommerce-white-label-retail|E-Commerce]] — the two revenue arms
- [[10-Projects/Corporate-Registry|Corporate Registry]] — the entities being consolidated
- [[chatgpt-conversations/innovatience/|Innovatience finance conversations]] — Roy's actual tax/payroll questions

## Sources

- [Chart of Accounts 101 for Canadian Businesses (2026) — Enkel](https://www.enkel.ca/blog/bookkeeping/chart-of-accounts-101-a-guide-for-canadian-business-owners/)
- [Small Business Deduction in Canada 2026 — Mackisen CPA](https://mackisen.com/blog/small-business-deduction-in-canada-2026-what-s-changing-and-how-to-qualify)
- [Associated Corporations and the SBD — Marcil Lavallée](https://marcil-lavallee.ca/en/bulletin/associated-corporations-and-the-small-business-deduction/)
- [Intercompany Transactions & Corporate Group Tax — Accounting Plus](https://accplus.ca/knowledge-base/corporation-tax/how-to-optimize-your-corporate-groups-tax-position-using-intercompany-transactions/)
- Vault: [[chatgpt-conversations/innovatience/|Innovatience finance corpus]] (salary-vs-corporation 68 msgs, CRA passive income, GST/payroll, single-client rules)
