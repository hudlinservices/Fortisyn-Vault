#!/bin/bash
# Daily scout — runs headless Claude to find and fill knowledge gaps.
# Invoked by system crontab. Logs to 30-Automations/logs/.
# Exits non-zero and writes a FAILED marker if the run was blocked (e.g. stale
# NotebookLM cookie / MCP disconnect), since `claude --print` itself exits 0.
export PATH="/home/dev66/.local/bin:/usr/bin:/bin:$PATH"
VAULT="/home/dev66/my_brain-vault"
LOG="$VAULT/30-Automations/logs/cron-scout-$(date +\%Y-\%m-\%d).log"

cd "$VAULT" || exit 1

{
  echo "=== scout run: $(date -Iseconds) ==="
  OUT=$(claude --print --permission-mode bypassPermissions \
    "Run the Scout workflow defined in CLAUDE.md and 20-Skills/research/knowledge-scout.md: scan index.md, log.md, gap-priorities.md, and the last lint report for knowledge gaps. Rank 3-5 gaps by compound value, research each via NotebookLM (create notebook, add 2-4 web sources, query overview/connections/implications), synthesize into wiki pages with proper frontmatter and cross-references, then update index.md, log.md, gap-priorities.md, and the Research Strategies section of the knowledge-scout skill. This is an autonomous cron run: proceed without human approval on the ranked gap list, but record what you chose and why in log.md. Commit and push the changes with git.")
  RC=$?
  echo "$OUT"

  # Silent-failure guard: claude --print exits 0 even when blocked, so inspect
  # the output for auth/MCP/blocked markers.
  if [ $RC -ne 0 ] || printf '%s' "$OUT" | grep -qiE 'no cookies found|please login|failed to connect|mcp server.*(error|fail)|## blocked|i cannot run the|i can.t run the'; then
    echo "=== FAILED: scout run blocked or errored (claude rc=$RC) — see output above. Likely stale NotebookLM cookie; run: npx oneclicklm login ==="
    echo "=== finished: $(date -Iseconds) ==="
    exit 1
  fi
  echo "=== OK (claude rc=$RC) — finished: $(date -Iseconds) ==="
} >> "$LOG" 2>&1
