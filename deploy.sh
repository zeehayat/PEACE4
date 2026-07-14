#!/usr/bin/env bash
#
# Production deploy script for peace.srsp.cloud (and mhp.srsp.cloud, same app).
# Run this ON THE SERVER, from the app root:
#   cd /www/wwwroot/peace.srsp.cloud && ./deploy.sh
#
# What it does, always, in order: pull main, install PHP + JS deps, build
# frontend assets, run pending migrations, rebuild Laravel caches, restart
# Octane, health-check the app. Aborts immediately on the first failure
# (set -e) or if the working tree has uncommitted changes (see below).

set -euo pipefail

APP_URL="${DEPLOY_HEALTH_CHECK_URL:-https://peace.srsp.cloud/mhp/overview}"
OCTANE_PROCESS_NAME="${DEPLOY_OCTANE_PROCESS:-octane}"

step() { printf '\n==> %s\n' "$1"; }

step "Checking working tree is clean"
if [ -n "$(git status --porcelain)" ]; then
    echo "ERROR: uncommitted changes found. Review/stash/commit them manually before deploying:"
    git status --short
    exit 1
fi

step "Pulling latest main"
git pull origin main

step "Installing PHP dependencies"
composer install --no-dev --no-interaction

step "Installing JS dependencies"
npm install

step "Building frontend assets"
npm run build

step "Running pending migrations"
php artisan migrate --force

step "Rebuilding caches"
php artisan config:cache
php artisan route:cache
php artisan view:cache

step "Restarting application process ($OCTANE_PROCESS_NAME)"
supervisorctl restart "$OCTANE_PROCESS_NAME"

step "Health check"
sleep 2
HTTP_CODE=$(curl -s -o /dev/null -w '%{http_code}' "$APP_URL")
if [[ "$HTTP_CODE" =~ ^(200|302)$ ]]; then
    echo "OK: $APP_URL responded $HTTP_CODE"
else
    echo "WARNING: $APP_URL responded $HTTP_CODE (expected 200 or 302) - check the app manually."
    exit 1
fi

step "Deploy complete: $(git rev-parse --short HEAD)"
