#!/usr/bin/env bash
# Setup script for speckit-plan
# Returns JSON with paths for the planning workflow

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../../../" && pwd)"

# Read feature.json for the active feature directory
FEATURE_JSON="$REPO_ROOT/.specify/feature.json"
if [ ! -f "$FEATURE_JSON" ]; then
  echo '{"error": "No active feature. Run /speckit-specify first."}' >&2
  exit 1
fi

FEATURE_DIR=$(grep -o '"feature_directory"[[:space:]]*:[[:space:]]*"[^"]*"' "$FEATURE_JSON" | head -1 | sed 's/.*"feature_directory"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')

SPECS_DIR="$REPO_ROOT/specs"
FEATURE_SPEC="$REPO_ROOT/$FEATURE_DIR/spec.md"
IMPL_PLAN="$REPO_ROOT/$FEATURE_DIR/plan.md"
BRANCH="$(git branch --show-current 2>/dev/null || echo "main")"

# Output JSON
cat <<JSON
{
  "FEATURE_SPEC": "$FEATURE_SPEC",
  "IMPL_PLAN": "$IMPL_PLAN",
  "SPECS_DIR": "$SPECS_DIR",
  "BRANCH": "$BRANCH",
  "FEATURE_DIR": "$REPO_ROOT/$FEATURE_DIR"
}
JSON
