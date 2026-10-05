#!/usr/bin/env bash
# Eng.Fanara — update the live site from GitHub (run as root on the server).
# Usage: bash /opt/fanara/deploy/update.sh [--gallery]
set -euo pipefail
APP=/opt/fanara
mkdir -p /root/backups
[ -f $APP/data/fanara.db ] && cp $APP/data/fanara.db /root/backups/fanara-$(date +%F-%H%M).db
git config --global --add safe.directory "$APP"
git -C $APP pull --ff-only
chown -R fanara:fanara $APP
sudo -u fanara bash -c "cd $APP && npm ci --no-audit --no-fund && npx next build"
systemctl restart fanara
if [ "${1:-}" = "--gallery" ]; then
  sudo -u fanara bash -c "cd $APP && NODE_ENV=production npx payload run src/seed/gallery.ts"
fi
ls -1t /root/backups/fanara-*.db 2>/dev/null | tail -n +31 | xargs -r rm -f   # keep last 30 backups
echo "UPDATE-DONE"
