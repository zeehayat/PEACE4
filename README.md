# SRSP Peace

A Laravel 12 + Inertia/Jetstream application. This repo now ships with a full Docker development stack that runs the application behind Nginx with MySQL 8 as the database.

## Requirements

- Docker Engine 24+
- Docker Compose plugin 2+

## 1. Bootstrap the environment

```bash
cp .env.example .env               # add secrets, mail credentials, etc.
docker compose build               # builds the PHP-FPM image with Node + Composer
```

> **Tip**: if your host UID/GID are not `1000`, set `WWWUSER`/`WWWGROUP` before building, e.g. `WWWUSER=$(id -u) WWWGROUP=$(id -g) docker compose build`.

## 2. Start the stack

```bash
docker compose up -d
```

Services:
- `app`: PHP 8.3 FPM with Composer + Node 20
- `nginx`: serves `/public` and proxies PHP to the FPM container (exposed at `APP_PORT`, default `8080`)
- `mysql`: MySQL 8.0 with a persistent `mysql-data` volume (forwarded to `FORWARD_DB_PORT`, default `3307`)

Visit http://localhost:8080 once dependencies and migrations are in place.

## 3. Install dependencies inside the container

```bash
docker compose exec app composer install
docker compose exec app npm install
```

Then generate your key and run the database setup:

```bash
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
```

If you prefer to import the shipped SQL dump, run (adjust credentials if you changed the defaults in `.env`):

```bash
docker compose exec -T mysql mysql -usrsp -psecret srsp < srsp_peace.sql
```

## 4. Frontend tooling

- Dev server: `docker compose exec app npm run dev -- --host` (available at `http://localhost:5173` by default; override with `VITE_PORT`)
- Production build: `docker compose exec app npm run build`

## 5. Common artisan/dev commands

```bash
docker compose exec app php artisan test
docker compose exec app php artisan queue:work
docker compose exec app php artisan storage:link
```

Logs: `docker compose logs -f app` or `docker compose logs -f nginx`.

## 6. Environment variables of interest

- `APP_PORT`: host port that proxies to Nginx (default `8080`)
- `VITE_PORT`: forwarded port for the Vite dev server (default `5173`)
- `FORWARD_DB_PORT`: forwarded MySQL port on the host (default `3307`)
- `DB_HOST`: should stay `mysql` so the app reaches the database container
- `DB_USERNAME`/`DB_PASSWORD`/`DB_DATABASE`: passed directly to the MySQL container
- `DB_ROOT_PASSWORD`: controls the MySQL root password set inside the container

## 7. Housekeeping

```bash
docker compose down                # stop containers
docker compose down -v             # stop + remove database volume (wipes data)
```

Use `docker compose exec app bash` for an interactive shell when you need to run multiple commands within the PHP container.
