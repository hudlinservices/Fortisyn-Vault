---
title: "Monitor"
type: "moc"
tags:
  - dashboard
  - monitor
updated: "2026-05-24"
---

# Monitor

> Project oversight, agent performance, and activity trends.

```button
name 🏠 Home
type link
action [[00-Dashboard/Home]]
color yellow
```
^button-home

---

## Project Status Overview

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  priority AS "P",
  status AS "Status",
  deadline AS "Deadline",
  length(filter(file.tasks, (t) => !t.completed)) AS "Open Tasks",
  length(filter(file.tasks, (t) => t.completed)) AS "Done"
FROM "10-Projects"
WHERE tags INCLUDES "project"
SORT priority ASC, deadline ASC
```

---

## Agent Performance Summary

```dataview
TABLE WITHOUT ID
  agent AS "Agent",
  length(rows) AS "Total Runs",
  length(filter(rows, (r) => r.status = "completed")) AS "Succeeded",
  length(filter(rows, (r) => r.status = "failed")) AS "Failed",
  length(filter(rows, (r) => r.status = "awaiting_decision")) AS "Awaiting"
FROM "30-Automations/logs"
WHERE tags INCLUDES "agent-run"
GROUP BY agent
```

---

## Decisions Awaiting Your Input

```dataview
TABLE WITHOUT ID
  file.link AS "Run Log",
  agent AS "Agent",
  project AS "Project",
  delegated_outcome AS "Task",
  start_time AS "Started"
FROM "30-Automations/logs"
WHERE status = "awaiting_decision"
SORT start_time DESC
```

---

## Agent Activity Heatmap

```tracker
searchType: frontmatter
searchTarget: start_time
folder: 30-Automations/logs
startDate: 2026-02-24
endDate: 2026-05-24
month:
  mode: circle
  color: '#51cf66'
  circleColorByCount: true
```

---

## Agent Run Trends (Past 30 Days)

```tracker
searchType: frontmatter
searchTarget: steps_completed
folder: 30-Automations/logs
month:
  startWeekOn: 'Mon'
  mode: annotation
  summary:
    template: "{{sum()}} steps completed"
  color: '#4ec9b0'
```

---

## Tasks by Project

```chart
type: bar
labels: [OneClickLM]
datasets:
  - label: Done
    data: [5]
  - label: Open
    data: [3]
title: Tasks by Project
indexAxis: y
```

---

## Agent Success Rate

```chart
type: doughnut
labels: [Completed, Failed, Awaiting, Running]
datasets:
  - label: Agents
    data: [0, 0, 0, 0]
title: Agent Outcomes
```

---

## Overdue & At-Risk Projects

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  deadline AS "Deadline",
  priority AS "Priority",
  status AS "Status"
FROM "10-Projects"
WHERE status = "active" AND deadline != "" AND date(deadline) <= date(today) + dur(7 days)
SORT deadline ASC
```

---

## Recent Agent Runs (Last 7 Days)

```dataview
TABLE WITHOUT ID
  file.link AS "Run Log",
  agent AS "Agent",
  status AS "Status",
  start_time AS "Started",
  steps_completed + "/" + steps_total AS "Progress"
FROM "30-Automations/logs"
WHERE start_time >= date(today) - dur(7 days)
SORT start_time DESC
LIMIT 20
```

---

## Notes

- Charts populate as data accumulates.
- Tracker heatmap fills in as agent runs are logged.
- Add projects via Home → New Project.
