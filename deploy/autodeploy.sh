#!/usr/bin/env bash
# Auto-deploy: every few minutes (cron), if GitHub main has new commits, update the site.
# Also runs content imports when their source files changed:
#   gallery-media/**     → npm run gallery
#   content/ig-*.json    → npm run instagram
set -euo pipefail
APP=/opt/fanara
exec 9>/var/lock/fanara-autodeploy.lock
flock -n 9 || exit 0                      # another run in progress
git config --global --get-all safe.directory | grep -qx "$APP" || git config --global --add safe.directory "$APP"
git -C $APP fetch -q origin main
OLD=$(git -C $APP rev-parse HEAD); NEW=$(git -C $APP rev-parse origin/main)
[ "$OLD" = "$NEW" ] && exit 0
echo "== $(date -Is) deploy $OLD -> $NEW"
CHANGED=$(git -C $APP diff --name-only "$OLD" "$NEW")
bash $APP/deploy/update.sh
if echo "$CHANGED" | grep -q '^gallery-media/'; then sudo -u fanara bash -c "cd $APP && npm run -s gallery"; fi
for f in $(echo "$CHANGED" | grep -E '^content/ig-.*\.json$' || true); do
  [ -f "$APP/$f" ] && sudo -u fanara bash -c "cd $APP && NODE_ENV=production npx payload run src/seed/instagram.ts $APP/$f"
done
if echo "$CHANGED" | grep -q '^deploy/harden.sh$'; then bash $APP/deploy/harden.sh; fi
echo "== $(date -Is) AUTODEPLOY-DONE $NEW"
