#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../../../" && pwd)"
FEATURE_JSON="$REPO_ROOT/.specify/feature.json"

if [ ! -f "$FEATURE_JSON" ]; then
  echo '{"error": "No active feature. Run /speckit-specify first."}' >&2
  exit 1
fi

FEATURE_DIR_REL=$(grep -o '"feature_directory"[[:space:]]*:[[:space:]]*"[^"]*"' "$FEATURE_JSON" | head -1 | sed 's/.*"feature_directory"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
FEATURE_DIR="$REPO_ROOT/$FEATURE_DIR_REL"

REQUIRE_TASKS=false
INCLUDE_TASKS=false
for arg in "$@"; do
  case "$arg" in
    --require-tasks) REQUIRE_TASKS=true ;;
    --include-tasks) INCLUDE_TASKS=true ;;
  esac
done

if $REQUIRE_TASKS && [ ! -f "$FEATURE_DIR/tasks.md" ]; then
  echo '{"error": "No tasks.md found. Run /speckit-tasks first."}' >&2
  exit 1
fi

AVAILABLE_DOCS=""
for doc in spec.md plan.md research.md data-model.md quickstart.md; do
  [ -f "$FEATURE_DIR/$doc" ] && AVAILABLE_DOCS="$AVAILABLE_DOCS $doc"
done
[ -d "$FEATURE_DIR/contracts" ] && AVAILABLE_DOCS="$AVAILABLE_DOCS contracts/"
[ -f "$FEATURE_DIR/tasks.md" ] && $INCLUDE_TASKS && AVAILABLE_DOCS="$AVAILABLE_DOCS tasks.md"

AVAILABLE_DOCS=$(echo $AVAILABLE_DOCS | xargs)

cat <<JSON
{
  "FEATURE_DIR": "$FEATURE_DIR",
  "AVAILABLE_DOCS": "$AVAILABLE_DOCS"
}
JSON
