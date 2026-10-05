#!/usr/bin/env bash
# Eng.Fanara — one-shot server install for Ubuntu 22.04/24.04 or Debian 12.
# Usage (as root):  DOMAIN=engfanara.com EMAIL=fanarateb@gmail.com bash install.sh
set -euo pipefail
DOMAIN="${DOMAIN:-engfanara.com}"
EMAIL="${EMAIL:-fanarateb@gmail.com}"
REPO="${REPO:-git@github.com:engpodineh/fanara-web.git}"
APP=/opt/fanara

echo "==> System packages"
apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get install -y curl git nginx ufw certbot python3-certbot-nginx build-essential

echo "==> Node.js 22"
if ! command -v node >/dev/null || [[ "$(node -v)" != v22* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

echo "==> GitHub deploy key (repo is private)"
mkdir -p /root/.ssh && chmod 700 /root/.ssh
[ -f /root/.ssh/fanara_deploy ] || ssh-keygen -t ed25519 -N "" -C "fanara-server" -f /root/.ssh/fanara_deploy >/dev/null
grep -q "github.com" /root/.ssh/config 2>/dev/null || printf 'Host github.com\n  IdentityFile /root/.ssh/fanara_deploy\n  IdentitiesOnly yes\n' >> /root/.ssh/config
ssh-keyscan -t ed25519 github.com >> /root/.ssh/known_hosts 2>/dev/null
if ! git ls-remote "$REPO" >/dev/null 2>&1; then
  echo
  echo "Add this key in GitHub: repo fanara-web > Settings > Deploy keys > Add deploy key (leave 'Allow write access' OFF):"
  echo
  cat /root/.ssh/fanara_deploy.pub
  echo
  echo "Then run this script again."
  exit 0
fi

echo "==> App user and code"
id fanara >/dev/null 2>&1 || useradd -r -m -d /home/fanara -s /bin/bash fanara
if [ -d "$APP/.git" ]; then git -C "$APP" pull --ff-only; else git clone "$REPO" "$APP"; fi
chown -R fanara:fanara "$APP"

if [ ! -f "$APP/.env" ]; then
  SECRET=$(openssl rand -hex 32)
  cat > "$APP/.env" <<ENV
DATABASE_URI=file:/opt/fanara/data/fanara.db
PAYLOAD_SECRET=$SECRET
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
ENV
  chmod 600 "$APP/.env"; chown fanara:fanara "$APP/.env"
fi
mkdir -p "$APP/data"; chown fanara:fanara "$APP/data"

echo "==> Build (takes a few minutes)"
sudo -u fanara bash -c "cd $APP && npm ci --no-audit --no-fund && npx next build"

echo "==> Service"
cat > /etc/systemd/system/fanara.service <<UNIT
[Unit]
Description=Eng.Fanara website
After=network.target
[Service]
User=fanara
WorkingDirectory=$APP
EnvironmentFile=$APP/.env
ExecStart=/usr/bin/npx next start -p 3000 -H 127.0.0.1
Restart=always
Environment=NODE_ENV=production
[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload && systemctl enable --now fanara

echo "==> Nginx"
cat > /etc/nginx/sites-available/fanara <<NGX
server {
  listen 80;
  server_name $DOMAIN www.$DOMAIN;
  client_max_body_size 200M;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}
NGX
ln -sf /etc/nginx/sites-available/fanara /etc/nginx/sites-enabled/fanara
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> Firewall"
# Keep every port sshd listens on open (this host uses 22, 3031 or 3131) so we never lock ourselves out.
for p in 22 3031 3131 $(ss -tlnp 2>/dev/null | awk '/sshd/ {n=split($4,a,":"); print a[n]}' | sort -u); do ufw allow "$p"/tcp; done
ufw allow 'Nginx Full'; ufw --force enable

echo "==> HTTPS (needs DNS already pointing here)"
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" -m "$EMAIL" --agree-tos -n --redirect \
  || echo "!! HTTPS skipped: DNS not pointing here yet. Re-run: certbot --nginx -d $DOMAIN -d www.$DOMAIN"

echo
echo "DONE. Open https://$DOMAIN/admin to create the admin account."
