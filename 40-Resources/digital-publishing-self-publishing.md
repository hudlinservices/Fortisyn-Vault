---
title: "Digital Publishing & Self-Publishing (KDP)"
category: concept
tags:
  - publishing
  - kdp
  - ebook
  - self-publishing
  - literary-imprint
  - monetization
source: "WebSearch/WebFetch 2026-06-22 — kdpeasy.com 2026 royalty guide, KDP help center; grounded in chatgpt-conversations/book-setup-on-kdp"
date: "2026-06-22"
---
# Digital Publishing & Self-Publishing (KDP)

The business and craft of turning a manuscript into a sellable product across ebook, paperback, and hardcover — the domain behind [[10-Projects/literaryimprint/_corporate-hub|Literary Imprint]]. The vault names `ebook` (34 pages), `publishing` (15), and KDP everywhere but never documented *how* digital self-publishing actually works or where the money comes from. This page is that backbone.

It is the **first arm of the Fortisyn content-to-commerce pipeline**: Roy Hudlin writes → Literary Imprint publishes → [[10-Projects/auronmedia/_corporate-hub|Auron Media]] designs covers + launch marketing → revenue flows back through the [[40-Resources/accounting-multi-entity-finance|finance layer]]. The other arm — merch, not books — is [[40-Resources/ecommerce-white-label-retail|E-Commerce & White-Label Retail]].

## The Three Formats

Modern self-publishing ships one manuscript in three products, each with its own economics:

| Format | Production | Reader |
|---|---|---|
| **Ebook (Kindle)** | EPUB upload, or KPF via Kindle Create | Instant download, lowest price |
| **Paperback** | Print-on-demand (POD) — printed only when ordered, zero inventory | Physical, mid price |
| **Hardcover** | POD, 6×9" trim (B&W or premium color via US marketplace) | Premium, highest price |

Print-on-demand is what makes this viable for a small imprint: **no inventory, no upfront print run.** A book is manufactured only after a customer buys it. This is the publishing analogue of the [[40-Resources/ecommerce-white-label-retail|merch POD model]] — the same "produce-on-order" logic, applied to books instead of t-shirts.

## KDP Royalty Economics (2026)

Amazon KDP is the dominant channel and the one Roy used (see [[chatgpt-conversations/book-setup-on-kdp|Book Setup on KDP]]). The rates are tiered and worth knowing precisely because they drive pricing decisions:

**Ebook:**
- **70% royalty** when priced **$2.99–$9.99** in major territories (US/UK/CA/etc.) — *minus* a **$0.15/MB delivery fee**. Formula: `70% × list − ($0.15 × file MB)`. A $4.99 / 1 MB ebook nets ~$3.34.
- **35% royalty** below $2.99 or above $9.99 — no delivery fee. A $0.99 ebook nets ~$0.35.
- The $2.99–$9.99 band is the sweet spot: the 70% tier roughly *doubles* per-sale royalty over 35%.
- ⚠️ **Delivery fee punishes image-heavy books.** A 5 MB file costs $0.68/sale vs $0.68→$0.08 for 0.5 MB. Compress images to 72–150 DPI. This directly affects Roy's [[40-Resources/photographic-poetry|photographic poetry]] books, which are image-heavy.

**Paperback / Hardcover (since June 2025, tiered):**
- **60%** of list price minus printing cost at $9.99+ (50% below that).
- Printing cost = fixed + per-page, varying by page count, ink (B&W vs color), trim size.
- Example: 200-page paperback at $9.99 → `(0.60 × 9.99) − $2.75 = ~$3.24` royalty.
- Color printing is far costlier (premium color 8.5×11" ~$13.15/100pp) — forces a ~$21.99+ list price.

**Expanded Distribution** (libraries, bookstores, other retailers via KDP): royalty drops to **40%** of list minus print cost — roughly *a third less* than selling direct on Amazon.

## KDP Select / Kindle Unlimited — The Exclusivity Trade

Enrolling an ebook in **KDP Select** puts it in **Kindle Unlimited** (subscribers read free) and unlocks promo tools (Countdown Deals). The cost:
- **90-day exclusivity to Amazon** — you cannot sell that ebook on Apple Books, Kobo, or your own site.
- KU pays **~$0.004–$0.005 per KENP page read** from a shared monthly Global Fund — a fully-read 300-page novel earns ~$1.35.

> ⚠️ **Exclusivity vs. wide distribution is a strategic fork.** KDP Select (Amazon-only) trades reach for KU income + promos. "Going wide" (Apple/Kobo/own-site, often via an aggregator like Draft2Digital) trades KU income for channel diversity. Literary Imprint's DIY/DFY model should pick this deliberately per title — not by default.

## ISBN & Publisher of Record

- KDP offers a **free ISBN**, but Amazon is then listed as publisher of record and the ISBN can't follow the book elsewhere. A **free KDP ISBN is per-format** (separate for paperback vs hardcover).
- **Owning your ISBN** (bought from the registrar) makes **[[10-Projects/literaryimprint/_corporate-hub|Literary Imprint]] the publisher of record** — the professional choice for an imprint that wants its name on the spine and portability across channels. This is the concrete difference between "self-published on Amazon" and "published by Literary Imprint."

## How Literary Imprint Applies This

Literary Imprint's two paths map directly onto the mechanics above:
- **DIY** (free + % of sales) = author handles KDP setup, formatting, the exclusivity/ISBN choices. The "Sales and royalty tracking" dashboard surfaces the tier math above.
- **DFY** (no upfront, 15% net) = imprint handles formatting, [[10-Projects/auronmedia/_corporate-hub|Auron]] cover design, wide-vs-Select strategy, launch.

All 5 of Roy's books ([[10-Projects/literaryimprint/creative-work|Creative Work]]) ran through this pipeline — *The Art of Stillness* leads "The Mindful Way Trilogy" (series naming and KDP categories worked out in the [[chatgpt-conversations/book-setup-on-kdp|KDP setup conversation]]).

## Related

- [[10-Projects/literaryimprint/_corporate-hub|Literary Imprint]] — the publishing entity (DIY/DFY model)
- [[10-Projects/royhudlin/_corporate-hub|Roy Hudlin]] — author of all 5 books
- [[10-Projects/literaryimprint/creative-work|Creative Work]] — the 5-book + photo-poetry catalog
- [[40-Resources/photographic-poetry|Photographic Poetry]] — image-heavy books → ebook delivery-fee impact
- [[40-Resources/narrative-alchemy|Narrative Alchemy]] — the craft that fills the books
- [[40-Resources/ecommerce-white-label-retail|E-Commerce & White-Label Retail]] — the other arm of content-to-commerce (merch)
- [[40-Resources/accounting-multi-entity-finance|Accounting & Multi-Entity Finance]] — where book royalties land
- [[40-Resources/marketing/seo-fundamentals|SEO]] / [[40-Resources/marketing/email-marketing|Email Marketing]] — how launches are promoted

## Sources

- [KDP Royalty Rates 2026: Complete Guide](https://www.kdpeasy.com/guides/2026-kdp-royalty-rates)
- [KDP Help — eBook Royalties](https://kdp.amazon.com/en_US/help/topic/G200644210) / [Paperback Royalty](https://kdp.amazon.com/en_US/help/topic/G201834330)
- [Self-Publishing on Amazon: The Ultimate KDP Guide](https://blog.chapter.pub/self-publishing-on-amazon/)
- Vault: [[chatgpt-conversations/book-setup-on-kdp|Book Setup on KDP]] (Roy's actual KDP setup, 28 msgs)
