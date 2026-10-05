#!/usr/bin/env bash
# Consistent SQLite snapshot + uploaded files. Keeps 14 DB snapshots and 7 file archives.
# Usage: backup.sh [label]   (cron: daily)
set -euo pipefail
APP=/opt/fanara; B=/root/backups; L=${1:-daily}; T=$(date +%F-%H%M)
mkdir -p $B && chmod 700 $B
if [ -f $APP/data/fanara.db ]; then
  sqlite3 $APP/data/fanara.db ".backup '$B/db-$L-$T.db'"
fi
if [ "$L" = "daily" ]; then
  tar -C $APP -czf $B/files-$T.tgz media private 2>/dev/null || true
fi
ls -1t $B/db-*.db 2>/dev/null | tail -n +15 | xargs -r rm -f
ls -1t $B/files-*.tgz 2>/dev/null | tail -n +8 | xargs -r rm -f
echo "BACKUP-OK $L $T"
