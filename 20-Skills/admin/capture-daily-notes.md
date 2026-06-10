---
name: "Capture Daily Notes"
domain: "admin"
prerequisites:
  - "Obsidian open"
  - "QuickAdd plugin configured"
estimated_time: "5 minutes"
tools:
  - "QuickAdd"
  - "Templater"
agent_executable: false
agent_steps: []
tags:
  - skill
  - admin
version: 1
last_updated: "2026-05-18"
---

# Capture Daily Notes

## Purpose

Daily end-of-day ritual to capture loose ends, reflect on the day, and prepare tomorrow's priorities.

## Prerequisites

- [ ] Obsidian open with vault loaded
- [ ] QuickAdd plugin configured with Quick Capture choice
- [ ] Today's daily note created

## Steps

1. `[human]` Open today's daily note in `00-Dashboard/daily/`
2. `[human]` Review `## Quick Capture` section — triage any unprocessed captures
3. `[human]` Fill `## End of Day` section:
   - What got done today
   - What didn't get done
   - Captured for tomorrow
   - Tomorrow's top priority
4. `[human]` Update active project statuses if anything changed today
5. `[human]` Review agent activity in today's daily note — address any pending decisions
6. `[human]` Set tomorrow's top 3 priorities in tomorrow's daily note (create if needed)

## Expected Outputs

- Completed end-of-day reflection in today's daily note
- Tomorrow's daily note created with priorities set
- Outstanding captures triaged

## Tools & Automations

- QuickAdd Capture (`Cmd+Shift+C`)
- Templater (`Cmd+Shift+T` → daily-note template)

## Notes & Tips

- If you skip a day, do a catch-up by filling the End of Day section retroactively — it's worth the context preservation.
- The morning routine (Home dashboard) surfaces whatever you set as priorities the night before. Invest in good priority-setting here.
