---
title: "Skill Registry"
type: "moc"
tags:
  - moc
  - skill-registry
updated: "{{date}}"
---

# Skill Registry

## By Domain

### Content Creation
```dataview
TABLE WITHOUT ID
  file.link AS "Skill",
  description AS "Description",
  estimated_time AS "Est. Time",
  agent_executable AS "Agent-Ready"
FROM "20-Skills/content-creation"
WHERE tags INCLUDES "skill"
SORT file.name ASC
```

### Marketing
```dataview
TABLE WITHOUT ID
  file.link AS "Skill",
  description AS "Description",
  estimated_time AS "Est. Time",
  agent_executable AS "Agent-Ready"
FROM "20-Skills/marketing"
WHERE tags INCLUDES "skill"
SORT file.name ASC
```

### Design
```dataview
TABLE WITHOUT ID
  file.link AS "Skill",
  description AS "Description",
  estimated_time AS "Est. Time",
  agent_executable AS "Agent-Ready"
FROM "20-Skills/design"
WHERE tags INCLUDES "skill"
SORT file.name ASC
```

### Video Production
```dataview
TABLE WITHOUT ID
  file.link AS "Skill",
  description AS "Description",
  estimated_time AS "Est. Time",
  agent_executable AS "Agent-Ready"
FROM "20-Skills/video"
WHERE tags INCLUDES "skill"
SORT file.name ASC
```

### Administration
```dataview
TABLE WITHOUT ID
  file.link AS "Skill",
  description AS "Description",
  estimated_time AS "Est. Time",
  agent_executable AS "Agent-Ready"
FROM "20-Skills/admin"
WHERE tags INCLUDES "skill"
SORT file.name ASC
```

---

## All Skills

```dataview
TABLE WITHOUT ID
  file.link AS "Skill",
  domain AS "Domain",
  agent_executable AS "Agent-Ready",
  version AS "Version"
FROM "20-Skills"
WHERE tags INCLUDES "skill"
SORT domain ASC, file.name ASC
```
