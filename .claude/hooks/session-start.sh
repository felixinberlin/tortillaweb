#!/bin/bash
# SessionStart hook for Claude Code on the web: install dependencies so
# tests (vitest), lint (oxlint) and the Astro build work in cloud sessions.
# npm ci never rewrites package-lock.json (older npm versions strip its libc fields).
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"
npm ci --no-audit --no-fund
echo "Cloud limits: news page fetches, nominatim (geocoding) and OSM tiles may be blocked; WebSearch works. New award-map entries stay verified:false (see AGENTS.md)."
