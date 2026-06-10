---
date: "{{date}}"
day_of_week: "{{date:dddd}}"
active_project: ""
priorities:
  - ""
  - ""
  - ""
scheduled:
  - time: ""
    task: ""
energy: "medium"
agent_activity: []
tags:
  - daily-note
---

# {{date}} — {{date:dddd}}

## Priorities

- [ ] Priority 1:
- [ ] Priority 2:
- [ ] Priority 3:

## Schedule

| Time | Task |
|------|------|
| | |

## Agent Activity

```dataview
TABLE WITHOUT ID
  file.link AS "Agent Run",
  status AS "Status",
  delegated_outcome AS "Task"
FROM "30-Automations/logs"
WHERE start_time >= date("{{date}}") AND start_time < date("{{date}}") + dur(1 day)
SORT start_time DESC
```

## Quick Capture

<!-- QuickAdd captures append here -->

## Notes

---

## End of Day

### Reflect

**What got done today:**

**What didn't get done — and why:**

**One thing I learned today:**

### Capture Loose Ends

<!-- Review Quick Captures above and triage any that are still unprocessed -->
- [ ] Review and triage all Quick Captures
- [ ] Update relevant project hubs with today's progress

### Prepare Tomorrow

**Tomorrow's top 3 priorities:**
1. 
2. 
3. 

**Scheduled for tomorrow:**

| Time | Task |
|------|------|
| | |

**Agents to delegate overnight:**
