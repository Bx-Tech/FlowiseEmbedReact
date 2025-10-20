#!/bin/bash

# Watch script for FlowiseEmbedReact
# This watches the dist folder and pushes changes to yalc

echo "Starting watch for FlowiseEmbedReact..."
echo "Watching dist/ for changes..."

# Use fswatch if available, otherwise use native node watch
if command -v fswatch &> /dev/null; then
  fswatch -o dist/ | while read f; do
    echo "Change detected, pushing to yalc..."
    yalc push --sig
  done
else
  # Fallback to node watch
  npx watch "yalc push --sig" dist/
fi
