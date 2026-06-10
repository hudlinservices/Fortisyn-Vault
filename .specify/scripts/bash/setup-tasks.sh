#!/usr/bin/env bash
# Setup script for speckit-tasks
# Returns JSON with paths for the task generation workflow

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../../../" && pwd)"

FEATURE_JSON="$REPO_ROOT/.specify/feature.json"
if [ ! -f "$FEATURE_JSON" ]; then
  echo '{"error": "No active feature. Run /speckit-specify first."}' >&2
  exit 1
fi

FEATURE_DIR_REL=$(grep -o '"feature_directory"[[:space:]]*:[[:space:]]*"[^"]*"' "$FEATURE_JSON" | head -1 | sed 's/.*"feature_directory"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
FEATURE_DIR="$REPO_ROOT/$FEATURE_DIR_REL"
TASKS_TEMPLATE="$REPO_ROOT/.specify/templates/tasks-template.md"

# Discover available docs
AVAILABLE_DOCS=""
if [ -f "$FEATURE_DIR/spec.md" ]; then AVAILABLE_DOCS="$AVAILABLE_DOCS spec.md"; fi
if [ -f "$FEATURE_DIR/plan.md" ]; then AVAILABLE_DOCS="$AVAILABLE_DOCS plan.md"; fi
if [ -f "$FEATURE_DIR/research.md" ]; then AVAILABLE_DOCS="$AVAILABLE_DOCS research.md"; fi
if [ -f "$FEATURE_DIR/data-model.md" ]; then AVAILABLE_DOCS="$AVAILABLE_DOCS data-model.md"; fi
if [ -f "$FEATURE_DIR/quickstart.md" ]; then AVAILABLE_DOCS="$AVAILABLE_DOCS quickstart.md"; fi
if [ -d "$FEATURE_DIR/contracts" ]; then AVAILABLE_DOCS="$AVAILABLE_DOCS contracts/"; fi

AVAILABLE_DOCS=$(echo $AVAILABLE_DOCS | xargs)

cat <<JSON
{
  "FEATURE_DIR": "$FEATURE_DIR",
  "TASKS_TEMPLATE": "$TASKS_TEMPLATE",
  "AVAILABLE_DOCS": "$AVAILABLE_DOCS"
}
JSON
