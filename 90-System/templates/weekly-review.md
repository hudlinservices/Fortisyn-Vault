---
week_start: "{{VALUE:week_start}}"
week_end: "{{VALUE:week_end}}"
week_number: ""
tags:
  - weekly-review
created: "{{date}}"
---

# Weekly Review: {{VALUE:week_start}} to {{VALUE:week_end}}

## Accomplishments

### Human-Completed Tasks

```dataview
TABLE WITHOUT ID
  file.link AS "Log",
  skill AS "Skill",
  project AS "Project",
  duration_minutes AS "Time (min)"
FROM "20-Skills/logs"
WHERE date >= date("{{VALUE:week_start}}") AND date <= date("{{VALUE:week_end}}")
  AND executor = "human"
SORT date ASC
```

### Agent-Completed Tasks

```dataview
TABLE WITHOUT ID
  file.link AS "Log",
  skill AS "Skill",
  project AS "Project",
  duration_minutes AS "Time (min)"
FROM "20-Skills/logs"
WHERE date >= date("{{VALUE:week_start}}") AND date <= date("{{VALUE:week_end}}")
  AND contains(executor, "agent:")
SORT date ASC
```

### Agent Runs This Week

```dataview
TABLE WITHOUT ID
  file.link AS "Run Log",
  agent AS "Agent",
  status AS "Status",
  delegated_outcome AS "Delegated Outcome"
FROM "30-Automations/logs"
WHERE start_time >= date("{{VALUE:week_start}}") AND start_time <= date("{{VALUE:week_end}}") + dur(1 day)
SORT start_time ASC
```

## Agent Performance Summary

```dataview
TABLE WITHOUT ID
  agent AS "Agent",
  length(rows) AS "Total Runs",
  length(filter(rows, (r) => r.status = "completed")) AS "Succeeded",
  length(filter(rows, (r) => r.status = "failed")) AS "Failed"
FROM "30-Automations/logs"
WHERE start_time >= date("{{VALUE:week_start}}") AND start_time <= date("{{VALUE:week_end}}") + dur(1 day)
GROUP BY agent
```

## Overdue Items

```dataview
TABLE WITHOUT ID
  file.link AS "Project",
  deadline AS "Deadline",
  priority AS "Priority",
  status AS "Status"
FROM "10-Projects"
WHERE deadline != "" AND date(deadline) < date(today)
SORT deadline ASC
```

## Time Spent Per Project

```dataview
TABLE WITHOUT ID
  project AS "Project",
  sum(duration_minutes) AS "Total Minutes",
  round(sum(duration_minutes) / 60, 1) AS "Hours"
FROM "20-Skills/logs"
WHERE date >= date("{{VALUE:week_start}}") AND date <= date("{{VALUE:week_end}}")
GROUP BY project
SORT sum(duration_minutes) DESC
```

## Project Status Updates

<!-- Review each active project and update status -->

| Project | Status | Notes |
|---------|--------|-------|
| | | |

## Lessons Learned

<!-- What worked well this week? What didn't? -->

### What Worked
- 

### What Didn't
- 

### Process Improvements
- 

## Next Week Priorities

### Top 3 Goals
1. 
2. 
3. 

### Per Project
<!-- Set priorities for each active project -->

## Agent Template Audit

<!-- Review recent agent runs for template drift -->

- [ ] Review agent run logs for deviations from skill templates
- [ ] Update skill templates if agents found better approaches
- [ ] Check for new recurring tasks that should become skill templates
- [ ] Verify agent decision gates are firing correctly

## Notes

-
