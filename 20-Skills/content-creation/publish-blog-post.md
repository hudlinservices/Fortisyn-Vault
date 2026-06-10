---
name: "Publish Blog Post"
domain: "content-creation"
prerequisites:
  - "Draft written and edited"
  - "Hero image ready"
  - "SEO metadata prepared (title, description, tags)"
estimated_time: "45 minutes"
tools:
  - "WordPress CLI"
  - "ImageMagick"
agent_executable: true
agent_steps: [3, 4, 5, 6]
tags:
  - skill
  - content-creation
version: 1
last_updated: "2026-05-18"
---

# Publish Blog Post

## Purpose

Take a finished draft and publish it to the blog with proper formatting, SEO metadata, hero image, and social distribution.

## Prerequisites

- [ ] Draft written and edited (Google Docs, Markdown, or direct in Obsidian)
- [ ] Hero image created and saved
- [ ] SEO title, meta description, and tags prepared
- [ ] WordPress credentials configured

## Steps

1. `[human]` Final review of the draft — one last read-through for errors
2. `[human]` Approve or adjust SEO title, description, and tags
3. `[agent]` Convert draft to WordPress-compatible HTML/Markdown
4. `[agent]` Resize and optimize hero image to platform specs
5. `[agent]` Upload draft to WordPress as a draft post with metadata
6. `[agent]` Generate social media snippets for Twitter, LinkedIn, Facebook
7. `[human]` Review the WordPress preview and social snippets
8. `[human]` **GATE: PUBLISH** — confirm and publish, or schedule

## Expected Outputs

- Published blog post at the target URL
- Social media snippet drafts for 3 platforms
- Execution log with links to all artifacts

## Tools & Automations

- WordPress CLI (`wp post create`)
- ImageMagick (`convert -resize`)
- Content Distribution Pipeline (in `30-Automations/content-distribution.md`)

## Notes & Tips

- The hero image should be 1200x630 for optimal social sharing previews.
- If this is part of a series, link to the series hub in the post body.
- Always check the WordPress preview on mobile — responsive issues are easiest to catch before publishing.
