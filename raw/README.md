---
title: "Raw Sources"
date: "2026-06-09"
category: system
tags:
  - raw
  - sources
  - system
---
# Raw Sources

This directory holds the immutable source collection — articles, papers, web clippings, PDFs, transcripts, data files. These are the raw materials the wiki is built from.

## Rules

1. **The LLM reads from here but never modifies files here.** This is your source of truth.
2. **Sources are ingested one at a time** — drop a file in, tell the LLM to process it.
3. **After ingest, the source stays.** The derived knowledge lives in the wiki; the source remains as the immutable reference.
4. **Naming convention:** `YYYY-MM-DD - Description.ext` for easy chronological scanning.

## What goes here

- Web articles clipped via Obsidian Web Clipper
- PDF papers and reports
- Meeting notes and transcripts
- Podcast/show notes
- Book notes and highlights
- Reference documents and manuals
- Any external content you want the wiki to absorb

## What does NOT go here

- Wiki pages you write yourself (those go in the appropriate `10-90` directory)
- Agent run logs (those go in `30-Automations/logs/`)
- Templates (those go in `90-System/templates/`)

## How ingest works

1. You drop a source file here
2. You tell the LLM: "ingest raw/source-file.md"
3. The LLM reads it, discusses key takeaways with you
4. The LLM creates/updates wiki pages with the extracted knowledge
5. The LLM updates `index.md` with new pages
6. The LLM appends an entry to `log.md`
