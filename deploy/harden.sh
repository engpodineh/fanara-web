#!/usr/bin/env bash
# One-time (idempotent) server hardening for Eng.Fanara. Run as root.
set -euo pipefail
APP=/opt/fanara
apt-get install -y sqlite3 fail2ban unattended-upgrades >/dev/null

# nginx: security headers, hide version, rate-limit login + public upload/order endpoints (http-level, survives certbot edits)
cat > /etc/nginx/conf.d/fanara-security.conf <<'NGX'
map "$request_method:$request_uri" $fanara_limit_key {
  ~^POST:/api/(order-files|design-orders|feedback|highlight-comments|users/login|users/forgot-password)  $binary_remote_addr;
  default "";
}
limit_req_zone $fanara_limit_key zone=fanara_api:10m rate=10r/m;
limit_req zone=fanara_api burst=10 nodelay;
limit_req_status 429;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "frame-ancestors 'self'" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
NGX
sed -i 's/client_max_body_size 200M;/client_max_body_size 60M;/' /etc/nginx/sites-available/fanara
# hide nginx version (set in the main config; Ubuntu ships the line commented or already on)
sed -i -E 's/^\s*#?\s*server_tokens\s+\w+;/\tserver_tokens off;/' /etc/nginx/nginx.conf
grep -q 'server_tokens off' /etc/nginx/nginx.conf || sed -i 's/^http {/http {\n\tserver_tokens off;/' /etc/nginx/nginx.conf
nginx -t
systemctl reload nginx

# systemd: private file mode for new files, no privilege escalation
mkdir -p /etc/systemd/system/fanara.service.d
cat > /etc/systemd/system/fanara.service.d/hardening.conf <<'UNIT'
[Service]
UMask=0027
NoNewPrivileges=yes
PrivateTmp=yes
UNIT
systemctl daemon-reload

# permissions: DB, private uploads, media not world-readable
mkdir -p $APP/data $APP/private $APP/media
chown -R fanara:fanara $APP/data $APP/private $APP/media
chmod 750 $APP $APP/data $APP/private $APP/media
find $APP/data $APP/private -type f -exec chmod 640 {} +

# backups: daily consistent snapshot (replaces old cp-based job)
echo '20 3 * * * root bash /opt/fanara/deploy/backup.sh daily >> /root/backup.log 2>&1' > /etc/cron.d/fanara-backup

# auto-deploy from GitHub every 5 minutes (only acts when main has new commits)
echo '*/5 * * * * root bash /opt/fanara/deploy/autodeploy.sh >> /root/autodeploy.log 2>&1' > /etc/cron.d/fanara-autodeploy

# fail2ban for SSH; automatic security updates
cat > /etc/fail2ban/jail.d/sshd.local <<'F2B'
[sshd]
enabled = true
port = 22,3031,3131
maxretry = 5
bantime = 1h
F2B
systemctl enable --now fail2ban >/dev/null
dpkg-reconfigure -f noninteractive unattended-upgrades >/dev/null 2>&1 || true

systemctl restart fanara
echo "HARDEN-DONE"
