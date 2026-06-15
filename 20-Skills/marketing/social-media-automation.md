---
name: "Social Media Automation"
domain: "marketing"
estimated_time: "30-60 minutes (setup), 10 minutes per cycle"
agent_executable: true
agent_steps: [2, 3, 4, 6]
tools:
  - "Buffer MCP (mcp__buffer__*)"
  - "Obsidian Read/Write"
  - "mcp__notebooklm__notebook_query"
tags:
  - skill
  - marketing
  - social-media
  - automation
source: "Web research — Buffer, Sprout Social, SocialPilot (2026-06-15 scout)"
version: 1
last_updated: "2026-06-15"
---
# Social Media Automation

The execution template behind the [[90-System/agents/auron-agent|Auron Agent]]. Turns vault content into scheduled, brand-aligned social posts across every Fortisyn brand — with a human approval gate before anything publishes.

## Purpose

Automate the *mechanical* parts of social media (scheduling, queueing, cross-posting, best-time selection, analytics) while keeping the *judgment* parts (brand voice, what to say, when to go live) human-governed. Automation buys consistency and time; it must never publish unreviewed content.

## Prerequisites

- [ ] Buffer account connected; Buffer MCP tools available as `mcp__buffer__*`
- [ ] Brand voice profiles loaded (see [[90-System/agents/auron-agent|Auron Agent]] brand table)
- [ ] Content sources in the vault: books, poetry, projects, product launches, daily notes
- [ ] Posting schedule agreed per platform

## Steps

1. `[human]` **Pick the cycle.** Weekly calendar generation, or a single post? Confirm which brands and platforms are in scope.
2. `[agent]` **Draft from the vault.** Pull source material (a book excerpt, a product launch, a portfolio piece) and write platform-specific copy. Match the brand's voice exactly — if it reads like AI, rewrite it. Generate caption, hashtags, and an image/video brief per post.
3. `[agent]` **Queue in Buffer (draft).** Load posts into the Buffer queue via `mcp__buffer__*` with proposed times. Do **not** set them live yet.
4. `[agent]` **Apply best-time + spacing rules.** Instagram 8am/6pm, LinkedIn 7:30am/5pm, YouTube 12pm, weekdays. Stagger multiple posts 30-60 min apart. Use Buffer's best-time suggestions where available. Never exceed 3 posts/day per platform.
5. `[human]` **GATE: publish_post.** Review every drafted post. Approve / edit / skip each one. Nothing publishes without this.
6. `[agent]` **Publish + log.** On approval, schedule/publish via Buffer and record each post (brand, platform, time, content) in the content log.
7. `[human]` **Review engagement.** Weekly: check reach/engagement, feed learnings back into voice and timing.

## Automation Best Practices (2026)

- **Automate posting, not relationships.** Schedule and report automatically; keep replies, DMs, and community engagement human (or human-reviewed). Audiences punish obvious bot behavior.
- **Bulk-schedule for campaigns.** For launches, batch-queue the whole sequence ahead of time rather than posting live.
- **Use ML best-time posting.** Let the tool pick optimal times from your audience's actual engagement history instead of fixed guesses.
- **AI assists, human approves.** AI for caption drafts, hashtag sets, and content ideas — always with a human approval workflow before publish. This mirrors the GATE at step 5.
- **First-comment scheduling.** Put link-heavy or hashtag-heavy content in a scheduled first comment to keep captions clean (Instagram/LinkedIn).
- **One hub, many networks.** Buffer publishes to Instagram, LinkedIn, YouTube, Threads, Bluesky, and Mastodon from a single queue — no per-platform tooling.
- **Govern with approval flows.** Multi-brand agencies (which is what Auron Media is, internally) need explicit content-approval steps and clear logs. Don't let automation outrun review.

## Guardrails

- **Never publish without approval** (GATE: publish_post).
- **Never modify brand voice guidelines** (GATE: modify_brand_voice).
- **Never spend on ads/boosts** (GATE: spend_money).
- **Max 3 posts/day per platform.** Don't manufacture "queue debt" — scheduling far ahead just to look busy degrades quality.
- **Log everything posted** for the weekly review.

## Expected Outputs

- A drafted weekly content calendar or post set (per brand, per platform)
- Buffer queue populated (drafts, pending approval)
- Content log entries for published posts
- Engagement notes feeding the next cycle

## Related

- [[90-System/agents/auron-agent|Auron Agent]] — the agent that runs this skill
- [[40-Resources/marketing/social-media-marketing|Social Media Marketing]] — the domain knowledge behind it
- [[20-Skills/marketing/product-launch|Product Launch Routine]] — launches drive the campaign content
- [[20-Skills/content-creation/publish-blog-post|Publish Blog Post]] — blog content repurposed into social
- [[40-Resources/marketing/copywriting|Copywriting]] · [[40-Resources/marketing/growth-hacking|Growth Hacking]]
