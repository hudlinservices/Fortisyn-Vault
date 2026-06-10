# My Brain — Agentic Personal OS

<!-- SPECKIT START -->
## Active Plan

**Feature**: Agentic Personal OS Infrastructure
**Plan**: [specs/001-personal-os-infra/plan.md](specs/001-personal-os-infra/plan.md)
**Spec**: [specs/001-personal-os-infra/spec.md](specs/001-personal-os-infra/spec.md)
<!-- SPECKIT END -->

## Project Overview

An agentic personal operating system built on Obsidian where the user delegates outcomes and AI agents execute the work. The vault serves as the central knowledge hub, skill library, and agent orchestration platform.

## Key Principles

1. **Frictionless Capture** — store any thought in under 10 seconds
2. **Text-First, Tool-Augmented** — all knowledge in Markdown; tools wrap around
3. **Progressive Disclosure** — show what's needed for current context
4. **Compose, Don't Duplicate** — skills linked, never copied
5. **Local-First, Sync-Second** — works offline; sync is optional
6. **Agentic Orchestration with Human Guardrails** — agents execute autonomously; pause at creative, destructive, and ambiguous gates
7. **Continuous Evolution** — every execution improves the templates

## Tech Stack

- **Platform**: Obsidian (desktop) + Templater, Dataview, QuickAdd plugins
- **Agents**: Node.js + Anthropic SDK (Claude API)
- **Automation**: Bash scripts orchestrated by agents
- **Version Control**: Git
