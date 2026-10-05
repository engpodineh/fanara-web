#!/usr/bin/env bash
# engfanara.ir → engfanara.com (Persian homepage). One canonical site = better SEO, one admin.
# Run as root after the .ir A records point to this server. Safe to re-run.
set -euo pipefail
cat > /etc/nginx/sites-available/fanara-ir <<'NGX'
server {
  listen 80;
  server_name engfanara.ir www.engfanara.ir;
  location = / { return 301 https://engfanara.com/fa; }
  location / { return 301 https://engfanara.com$request_uri; }
}
NGX
ln -sf /etc/nginx/sites-available/fanara-ir /etc/nginx/sites-enabled/fanara-ir
nginx -t && systemctl reload nginx
if getent hosts engfanara.ir >/dev/null; then
  certbot --nginx -d engfanara.ir -d www.engfanara.ir -m fanarateb@gmail.com --agree-tos -n --redirect && echo "IR-HTTPS-DONE"
else
  echo "IR-DNS-NOT-READY: nginx is set; re-run this script when engfanara.ir points to $(curl -s -4 ifconfig.me || echo this server)"
fi
