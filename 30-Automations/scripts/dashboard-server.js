#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const VAULT = '/home/projects/pythonslayers/my_brain';
const PROJECTS_ROOT = '/home/projects';
const SESSIONS_DIR = '/home/royhudlin/.claude/projects';
const CLAUDE_MEM_DB = '/home/royhudlin/.claude-mem/claude-mem.db';
const PORT = 4200;

function parseFrontmatter(content) {
  if (!content.startsWith('---')) return {};
  const end = content.indexOf('---', 4);
  if (end === -1) return {};
  const fm = content.substring(4, end);
  const data = {};
  let key = null;
  for (let line of fm.split('\n')) {
    if (/^\s*$/.test(line)) continue;
    const match = line.match(/^(\w[\w_]*):\s*(.*)/);
    if (match) {
      key = match[1];
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith('[')) {
        try { data[key] = JSON.parse(val); } catch { data[key] = [val]; }
      } else {
        data[key] = val;
      }
    } else if (key) {
      const listMatch = line.match(/^\s+-\s+"?(.+?)"?$/);
      const listMatch2 = line.match(/^\s+-\s+(.+)/);
      if (listMatch || listMatch2) {
        const v = (listMatch || listMatch2)[1].replace(/^"|"$/g, '');
        if (!Array.isArray(data[key])) data[key] = [];
        data[key].push(v);
      }
    }
  }
  return data;
}

function getProjects() {
  const projects = [];
  const dir = path.join(VAULT, '10-Projects');
  try {
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md') || f === 'CLAUDE.local.md') continue;
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      const fm = parseFrontmatter(content);
      if (fm.tags && (typeof fm.tags === 'string' ? fm.tags.includes('project') : fm.tags.includes && fm.tags.includes('project'))) {
        const tasks = (content.match(/- \[([ x])\]\s+(.+)/g) || []).map(t => {
          const m = t.match(/- \[([ x])\]\s+(.+)/);
          return { done: m[1] === 'x', text: m[2] };
        });
        projects.push({
          name: fm.name || f.replace('.md', ''),
          status: fm.status || 'unknown',
          priority: fm.priority || 'P3',
          deadline: fm.deadline || '',
          goals: fm.goals || [],
          openTasks: tasks.filter(t => !t.done).length,
          doneTasks: tasks.filter(t => t.done).length,
          file: f
        });
      }
    }
  } catch (e) { console.error('Projects error:', e.message); }
  return projects;
}

function getAgentLogs() {
  const logs = [];
  const dir = path.join(VAULT, '30-Automations/logs');
  try {
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      const fm = parseFrontmatter(content);
      if (fm.agent || (fm.tags && typeof fm.tags === 'string' && fm.tags.includes('agent-run'))) {
        logs.push({
          agent: fm.agent || 'unknown',
          status: fm.status || 'unknown',
          project: fm.project || '',
          outcome: fm.delegated_outcome || '',
          startTime: fm.start_time || '',
          stepsDone: fm.steps_completed || 0,
          stepsTotal: fm.steps_total || 0,
          file: f
        });
      }
    }
  } catch (e) { console.error('Agent logs error:', e.message); }
  logs.sort((a, b) => b.startTime.localeCompare(a.startTime));
  return logs.slice(0, 20);
}

function getDailyNotes() {
  const notes = [];
  const dir = path.join(VAULT, '00-Dashboard/daily');
  try {
    for (const f of fs.readdirSync(dir).sort().reverse()) {
      if (!f.endsWith('.md') || f === 'CLAUDE.local.md') continue;
      const content = fs.readFileSync(path.join(dir, f), 'utf-8');
      const fm = parseFrontmatter(content);
      notes.push({
        date: fm.date || f.replace('.md', ''),
        priorities: fm.priorities || [],
        energy: fm.energy || 'medium',
        file: f
      });
    }
  } catch (e) { console.error('Daily notes error:', e.message); }
  return notes.slice(0, 14);
}

function getObservations() {
  try {
    const result = execSync(
      `python3 -c "
import sqlite3, json
conn = sqlite3.connect('${CLAUDE_MEM_DB}')
cur = conn.cursor()
cur.execute('''SELECT project, COUNT(*) as cnt, MAX(created_at) as last_ts
  FROM observations
  WHERE project IS NOT NULL AND project != ''
  GROUP BY project
  ORDER BY last_ts DESC
  LIMIT 20''')
projects = []
for row in cur.fetchall():
    projects.append({'project': row[0], 'count': row[1], 'lastActivity': str(row[2])[:19] if row[2] else ''})
conn.close()
print(json.dumps(projects))
"`, { timeout: 5000, encoding: 'utf-8' }
    );
    return JSON.parse(result);
  } catch (e) { console.error('Observations error:', e.message); return []; }
}

function getRecentObservations(limit) {
  try {
    const result = execSync(
      `python3 -c "
import sqlite3, json
conn = sqlite3.connect('${CLAUDE_MEM_DB}')
cur = conn.cursor()
cur.execute('''SELECT type, project, title, substr(text, 1, 120) as excerpt, created_at
  FROM observations
  ORDER BY created_at DESC
  LIMIT ${limit || 15}''')
obs = []
for row in cur.fetchall():
    obs.append({'type': row[0] or 'unknown', 'project': row[1] or '', 'title': row[2] or '', 'excerpt': row[3] or '', 'created': str(row[4])[:19] if row[4] else ''})
conn.close()
print(json.dumps(obs))
"`, { timeout: 5000, encoding: 'utf-8' }
    );
    return JSON.parse(result);
  } catch (e) { console.error('Recent obs error:', e.message); return []; }
}

function getSessions() {
  const sessions = [];
  const NOW = Date.now();
  const HOUR = 3600000;
  const DAY = 86400000;
  try {
    for (const dirName of fs.readdirSync(SESSIONS_DIR)) {
      const dirPath = path.join(SESSIONS_DIR, dirName);
      try { if (!fs.statSync(dirPath).isDirectory()) continue; } catch { continue; }
      if (dirName.startsWith('.')) continue;

      let latestMtime = 0;
      let totalSize = 0;
      let fileCount = 0;
      try {
        for (const f of fs.readdirSync(dirPath)) {
          if (!f.endsWith('.jsonl') && !f.endsWith('.md')) continue;
          const stat = fs.statSync(path.join(dirPath, f));
          if (stat.mtimeMs > latestMtime) latestMtime = stat.mtimeMs;
          totalSize += stat.size;
          fileCount++;
        }
      } catch { continue; }

      if (fileCount === 0) continue;

      const age = NOW - latestMtime;
      const active = age < HOUR ? 'active' : age < DAY ? 'recent' : 'dormant';
      const projectName = dirName.replace(/^-home(-projects)?-?/, '').replace(/-/g, ' ').trim() || 'home';

      sessions.push({
        project: projectName,
        dir: dirName,
        active,
        lastActivity: new Date(latestMtime).toISOString(),
        ageMinutes: Math.round(age / 60000),
        files: fileCount,
        sizeKB: Math.round(totalSize / 1024)
      });
    }
  } catch (e) { console.error('Sessions error:', e.message); }
  sessions.sort((a, b) => a.lastActivity.localeCompare(b.lastActivity)).reverse();
  return sessions;
}

function getScripts() {
  const scripts = [];
  const exts = new Set(['.sh', '.py', '.ts', '.js', '.mjs']);
  const skipDirs = new Set(['node_modules', '.npm', '.venv', 'venv', '__pycache__', '.git', '.claude', '.obsidian']);

  function walk(dirPath, projectName, depth) {
    if (depth > 5) return;
    let entries;
    try { entries = fs.readdirSync(dirPath, { withFileTypes: true }); }
    catch { return; }
    for (const entry of entries) {
      if (skipDirs.has(entry.name) || entry.name.startsWith('.')) continue;
      const full = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        walk(full, projectName || entry.name, depth + 1);
      } else if (entry.isFile() && exts.has(path.extname(entry.name))) {
        try {
          const stat = fs.statSync(full);
          scripts.push({
            name: entry.name,
            path: full,
            project: projectName || 'unknown',
            type: path.extname(entry.name).slice(1),
            sizeKB: Math.round(stat.size / 1024),
            modified: stat.mtime.toISOString()
          });
        } catch {}
      }
    }
  }

  try {
    for (const company of fs.readdirSync(PROJECTS_ROOT)) {
      const companyPath = path.join(PROJECTS_ROOT, company);
      try { if (!fs.statSync(companyPath).isDirectory()) continue; } catch { continue; }
      for (const project of fs.readdirSync(companyPath)) {
        const projectPath = path.join(companyPath, project);
        try { if (!fs.statSync(projectPath).isDirectory()) continue; } catch { continue; }
        walk(projectPath, `${company}/${project}`, 1);
      }
    }
  } catch (e) { console.error('Scripts error:', e.message); }

  scripts.sort((a, b) => b.modified.localeCompare(a.modified));
  return scripts.slice(0, 50);
}

function getVaultStats() {
  let totalFiles = 0, totalSize = 0;
  function walk(dir) {
    try {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) { walk(full); }
        else if (entry.name.endsWith('.md')) { totalFiles++; totalSize += fs.statSync(full).size; }
      }
    } catch {}
  }
  walk(VAULT);
  const allSessions = getSessions();
  return {
    totalFiles,
    totalSizeKB: Math.round(totalSize / 1024),
    projects: getProjects().length,
    agentLogs: (() => { try { return fs.readdirSync(path.join(VAULT, '30-Automations/logs')).filter(f => f.endsWith('.md') && f !== 'CLAUDE.local.md').length; } catch { return 0; } })(),
    sessions: allSessions.length,
    activeSessions: allSessions.filter(s => s.active === 'active').length,
    observationProjects: getObservations().length
  };
}

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' });
    return res.end();
  }

  const url = new URL(req.url, 'http://localhost:4200');
  const p = url.pathname;

  if (p === '/api/projects') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getProjects()));
  }
  if (p === '/api/agents') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getAgentLogs()));
  }
  if (p === '/api/daily') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getDailyNotes()));
  }
  if (p === '/api/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getVaultStats()));
  }
  if (p === '/api/observations') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getObservations()));
  }
  if (p === '/api/observations/recent') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getRecentObservations(parseInt(url.searchParams.get('limit')) || 15)));
  }
  if (p === '/api/sessions') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getSessions()));
  }
  if (p === '/api/scripts') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getScripts()));
  }
  if (p === '/api/scripts/run') {
    const scriptPath = url.searchParams.get('path');
    if (!scriptPath || !fs.existsSync(scriptPath)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ ok: false, error: 'Script not found: ' + (scriptPath || '') }));
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const dir = path.dirname(scriptPath);
        const ext = path.extname(scriptPath);
        let cmd, args;
        if (ext === '.py') { cmd = 'python3'; args = [scriptPath]; }
        else if (ext === '.ts') { cmd = 'npx'; args = ['tsx', scriptPath]; }
        else if (ext === '.js' || ext === '.mjs') { cmd = 'node'; args = [scriptPath]; }
        else if (ext === '.sh') { cmd = 'bash'; args = [scriptPath]; }
        else { cmd = scriptPath; args = []; }

        const child = spawn(cmd, args, { cwd: dir, timeout: 600000 });
        let stdout = '', stderr = '';

        child.stdout.on('data', d => stdout += d.toString());
        child.stderr.on('data', d => stderr += d.toString());

        child.on('close', code => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            ok: code === 0,
            exitCode: code,
            stdout: stdout.slice(0, 50000),
            stderr: stderr.slice(0, 50000)
          }));
        });

        child.on('error', err => {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: err.message }));
        });
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }
  if (p === '/api/action') {
    const action = url.searchParams.get('name');
    let result = { ok: true, action };
    try {
      if (action === 'daily-note') {
        execSync('obsidian "obsidian://open?vault=my_brain" &', { timeout: 3000 });
        result.output = 'Opened Obsidian';
      } else if (action === 'new-project') {
        const name = url.searchParams.get('project') || 'new-project';
        const dest = path.join(VAULT, '10-Projects', name + '.md');
        const now = new Date().toISOString().split('T')[0];
        const content = '---\nname: "' + name + '"\nstatus: "active"\npriority: "P2"\ndeadline: ""\ngoals: []\ntags:\n  - project\ncreated: "' + now + '"\nupdated: "' + now + '"\n---\n\n# ' + name + '\n\n## Overview\n\n\n\n## Goals\n\n- [ ] \n\n## Tasks\n\n### Active\n\n- [ ] \n\n### Backlog\n\n- [ ] \n\n## Notes\n\n';
        if (!fs.existsSync(dest)) {
          fs.writeFileSync(dest, content);
          result.output = 'Created project: ' + name;
        } else {
          result.output = 'Project already exists';
        }
      } else if (action === 'open-obsidian') {
        execSync('obsidian "obsidian://open?vault=my_brain" &', { timeout: 3000 });
        result.output = 'Opened Obsidian';
      } else {
        result = { ok: false, error: 'Unknown action: ' + action };
      }
    } catch (e) { result.ok = false; result.error = e.message; }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(result));
  }

  if (p === '/api/tokens') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(getTokenStats()));
  }

  // Serve dashboard HTML
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const html = fs.readFileSync(path.join(__dirname, 'dashboard.html'), 'utf-8');
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Dashboard: http://localhost:' + PORT);
});

function getTokenStats() {
  const projects = {};
  try {
    for (const dirName of fs.readdirSync(SESSIONS_DIR)) {
      const dirPath = path.join(SESSIONS_DIR, dirName);
      try { if (!fs.statSync(dirPath).isDirectory()) continue; } catch { continue; }
      if (dirName.startsWith('.')) continue;

      const proj = dirName.replace(/-home-projects-/, '').replace(/-home-/, '')
        .replace(/-/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase()) || 'Home';

      let totalChars = 0, fileCount = 0;
      const daily = {};

      try {
        for (const f of fs.readdirSync(dirPath)) {
          if (!f.endsWith('.jsonl')) continue;
          const fpath = path.join(dirPath, f);
          const stat = fs.statSync(fpath);
          const day = stat.mtime.toISOString().split('T')[0];
          const chars = stat.size;
          totalChars += chars;
          fileCount++;
          if (!daily[day]) daily[day] = { chars: 0, files: 0 };
          daily[day].chars += chars;
          daily[day].files++;
        }
      } catch { continue; }

      if (totalChars > 0) {
        projects[proj] = {
          project: proj,
          estTokens: Math.round(totalChars / 4),
          totalChars,
          files: fileCount,
          daily
        };
      }
    }
  } catch (e) { console.error('Token stats error:', e.message); }

  // Sort by token count desc
  const list = Object.values(projects).sort((a, b) => b.estTokens - a.estTokens);

  // Compute daily/weekly/monthly summaries
  const NOW = new Date();
  const today = NOW.toISOString().split('T')[0];
  const weekAgo = new Date(NOW - 7 * 86400000).toISOString().split('T')[0];
  const monthAgo = new Date(NOW - 30 * 86400000).toISOString().split('T')[0];

  let todayTokens = 0, weekTokens = 0, monthTokens = 0, allTokens = 0;
  for (const p of list) {
    allTokens += p.estTokens;
    for (const [day, d] of Object.entries(p.daily)) {
      const t = Math.round(d.chars / 4);
      if (day === today) todayTokens += t;
      if (day >= weekAgo) weekTokens += t;
      if (day >= monthAgo) monthTokens += t;
    }
  }

  return {
    projects: list,
    summary: { todayTokens, weekTokens, monthTokens, allTokens },
    today, weekAgo, monthAgo
  };
}

