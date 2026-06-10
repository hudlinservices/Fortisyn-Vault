---
title: "Home Dashboard"
type: "moc"
tags:
  - moc
updated: "2026-05-18"
---

# Home Dashboard

---

## Today's Priorities

```dataview
TABLE WITHOUT ID
  file.link AS "Daily Note",
  priorities AS "Priorities"
FROM "00-Dashboard/daily"
WHERE date = date(today)
LIMIT 1
```

## Scheduled Today

```dataview
TABLE WITHOUT ID
  scheduled.time AS "Time",
  scheduled.task AS "Task"
FROM "00-Dashboard/daily"
WHERE date = date(today)
FLATTEN scheduled
WHERE scheduled.time != ""
```

## Active Projects

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  priority AS "Priority",
  deadline AS "Deadline",
  status AS "Status"
FROM "10-Projects"
WHERE status = "active"
SORT priority ASC, deadline ASC
```

## Overdue & Approaching Deadlines

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  deadline AS "Deadline",
  priority AS "Priority"
FROM "10-Projects"
WHERE status = "active" AND deadline != "" AND date(deadline) <= date(today) + dur(7 days)
SORT deadline ASC
```

## Agents Needing Decisions

```dataview
TABLE WITHOUT ID
  file.link AS "Agent Run",
  agent AS "Agent",
  project AS "Project"
FROM "30-Automations/logs"
WHERE status = "awaiting_decision"
SORT start_time DESC
```

## Recent Agent Activity (Last 24h)

```dataview
TABLE WITHOUT ID
  file.link AS "Run Log",
  agent AS "Agent",
  status AS "Status",
  delegated_outcome AS "Task"
FROM "30-Automations/logs"
WHERE start_time >= date(today) - dur(1 day)
SORT start_time DESC
LIMIT 10
```

## Unprocessed Captures (Last 3 Days)

```dataview
TASK
FROM "00-Dashboard/daily"
WHERE !completed AND file.day >= date(today) - dur(3 days)
LIMIT 20
```

---

## Quick Launch

```button
name 📅 Daily Note
type command
action Templater: Create new note from template
color blue
```
^button-daily-note

```button
name ✨ Quick Capture
type command
action QuickAdd: Capture
color green
```
^button-capture

```button
name 📁 New Project
type command
action Templater: Create new note from template
color purple
```
^button-project

```button
name 🤖 Delegate to Agent
type command
action QuickAdd: Delegate to Agent
```
^button-delegate

```button
name 📊 Monitor
type link
action [[00-Dashboard/Monitor]]
color yellow
```
^button-monitor

### Navigate

- [[00-Dashboard/Home|Home]]
- [[00-Dashboard/Monitor|Monitor]]
- [[10-Projects/|Projects]]
- [[20-Skills/Skill-Registry|Skills]]
- [[90-System/agents/Agent-Registry|Agents]]
- [[40-Resources/|Resources]]
- [[00-Dashboard/reviews/|Weekly Reviews]]
