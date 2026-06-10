---
name: "Product Launch Routine"
domain: "marketing"
prerequisites:
  - "Product ready for launch"
  - "Launch date set"
  - "Marketing assets prepared"
estimated_time: "2-4 hours (over 1-2 days)"
tools:
  - "WordPress CLI"
  - "social-api"
  - "email-api"
agent_executable: true
agent_steps: [2, 3, 4, 5, 7, 8]
tags:
  - skill
  - marketing
  - composition
version: 1
last_updated: "2026-05-18"
---

# Product Launch Routine

## Purpose

Orchestrate the full launch sequence for a new product or feature: announcement blog post, email blast, social media campaign, and follow-up monitoring.

## Prerequisites

- [ ] Product ready (shipped or launchable)
- [ ] Launch date and time confirmed
- [ ] Marketing assets: hero image, screenshots, demo video
- [ ] Email list segmented and ready
- [ ] Social media accounts authorized

## Steps

### Phase 1: Pre-Launch (Day Before)

1. `[human]` Review and approve all marketing copy (blog post, email, social posts)
2. `[agent]` Stage the announcement blog post in WordPress (draft) via [[20-Skills/content-creation/publish-blog-post|Publish Blog Post]]
3. `[agent]` Prepare email campaign draft in email platform
4. `[agent]` Schedule social media posts for launch time across configured platforms

### Phase 2: Launch Day

5. `[human]` **GATE: LAUNCH** — final go/no-go decision
6. `[agent]` Publish the announcement blog post (via [[20-Skills/content-creation/publish-blog-post|Publish Blog Post]] publish step)
7. `[agent]` Send email blast to configured list
8. `[agent]` Post to social media platforms

### Phase 3: Post-Launch (1-3 Days After)

9. `[human]` Monitor metrics: page views, email open rate, social engagement
10. `[human]` Respond to comments and questions
11. `[human]` Retrospective: what worked, what didn't, update this template

## Expected Outputs

- Published announcement blog post
- Sent email campaign
- Posted social media campaign
- Launch metrics summary

## Tools & Automations

- [[20-Skills/content-creation/publish-blog-post|Publish Blog Post]] (sub-skill)
- Content Distribution Pipeline (`30-Automations/content-distribution.md`)
- Social Media Pipeline (`30-Automations/social-media.md`)

## Notes & Tips

- Stagger social posts by 30-60 minutes rather than posting all at once.
- Have a "launch FAQ" ready for common questions.
- The GATE at step 5 is critical — once past it, things go live. Double-check everything before saying "go."
