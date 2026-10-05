#!/usr/bin/env bash
# Eng.Fanara — update the live site from GitHub (run as root on the server).
# Builds into .next-build while the site keeps serving, then swaps and restarts (a few seconds of downtime).
# Usage: bash /opt/fanara/deploy/update.sh [--gallery]
set -euo pipefail
APP=/opt/fanara
bash $APP/deploy/backup.sh pre-update
git config --global --get-all safe.directory | grep -qx "$APP" || git config --global --add safe.directory "$APP"
git -C $APP pull --ff-only
chown -R fanara:fanara $APP
sudo -u fanara bash -c "cd $APP && npm ci --no-audit --no-fund && rm -rf .next-build && NEXT_DIST_DIR=.next-build npx next build"
cd $APP && rm -rf .next-old && { [ -d .next ] && mv .next .next-old || true; } && mv .next-build .next
systemctl restart fanara
for i in $(seq 1 30); do curl -sf -o /dev/null http://127.0.0.1:3000/fa && break; sleep 1; done
if [ "${1:-}" = "--gallery" ]; then
  sudo -u fanara bash -c "cd $APP && npm run gallery"
fi
echo "UPDATE-DONE"
