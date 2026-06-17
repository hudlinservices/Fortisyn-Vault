#!/bin/bash
# Daily auto-ingest — runs headless Claude against the Vault Ingest notebook.
# Invoked by system crontab. Logs to 30-Automations/logs/.
# Exits non-zero and writes a FAILED marker if the run was blocked (e.g. stale
# NotebookLM cookie / MCP disconnect), since `claude --print` itself exits 0.
export PATH="/home/dev66/.local/bin:/usr/bin:/bin:$PATH"
VAULT="/home/dev66/my_brain-vault"
LOG="$VAULT/30-Automations/logs/cron-ingest-$(date +\%Y-\%m-\%d).log"

cd "$VAULT" || exit 1

{
  echo "=== auto-ingest run: $(date -Iseconds) ==="
  OUT=$(claude --print --permission-mode bypassPermissions \
    "Run the Path B auto-ingest workflow defined in CLAUDE.md: ingest from the Vault Ingest notebook (NotebookLM notebook 1ded6d40). Check source_list for sources not yet in 90-System/ingest-log.md, query each new source, synthesize into wiki pages (5-15 pages per source), cross-reference, flag contradictions, then update index.md, log.md, and ingest-log.md. Commit and push the changes with git. Report what was ingested. If there are no new sources, do nothing and report that.")
  RC=$?
  echo "$OUT"

  # Silent-failure guard: claude --print exits 0 even when blocked, so inspect
  # the output for auth/MCP/blocked markers. A clean "no new sources" no-op does
  # not match these patterns and is treated as success.
  if [ $RC -ne 0 ] || printf '%s' "$OUT" | grep -qiE 'no cookies found|please login|failed to connect|mcp server.*(error|fail)|## blocked|i cannot run the|i can.t run the'; then
    echo "=== FAILED: ingest run blocked or errored (claude rc=$RC) — see output above. Likely stale NotebookLM cookie; run: npx oneclicklm login ==="
    echo "=== finished: $(date -Iseconds) ==="
    exit 1
  fi
  echo "=== OK (claude rc=$RC) — finished: $(date -Iseconds) ==="
} >> "$LOG" 2>&1
