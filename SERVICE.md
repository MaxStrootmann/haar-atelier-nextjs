# haar-atelier-nextjs

Production Next.js storefront for Haar Atelier.

## Current State

- Active URL: `https://haar.manndigital.nl`
- Source of truth: this Next.js repository on `master`
- Latest validated modernization commit: `52b20a10 Handle Stripe agent disclosure in checkout e2e`
- Checkout mode: controlled by `STRIPE_MODE` and `NEXT_PUBLIC_STRIPE_MODE`

## Runtime

- Host: `mann-dev`
- Service root: `/opt/services/haar-atelier-nextjs`
- Deployed source: `/opt/services/haar-atelier-nextjs/current`
- Compose project: `haar-atelier-nextjs`
- App container: Next.js standalone on port `3000`
- Database: containerized PostgreSQL 16
- Ingress: shared Caddy at `/opt/services/ingress-caddy`
- Caddy route file: `/opt/services/ingress-caddy/sites/mann-dev.caddy`

## State and Secrets

- PostgreSQL data: `/var/lib/services/haar-atelier-nextjs/postgres`
- Runtime env: `/home/mann/.varlock/env/websites/haar-atelier-nextjs.env`
- PostgreSQL password file: `/opt/services/haar-atelier-nextjs/config/postgres_password`

Do not print raw env values, DB URLs, Stripe keys, webhook secrets, or password contents.

## Operations

```bash
cd /opt/services/haar-atelier-nextjs
docker compose ps
docker compose logs -f app
docker compose up -d --build app
```

Prisma operations:

```bash
cd /opt/services/haar-atelier-nextjs
docker compose exec app npx prisma db push
```

Database shell:

```bash
cd /opt/services/haar-atelier-nextjs
docker compose exec postgres psql -U haar_atelier -d haar_atelier
```

## Deploy From Source Checkout

Run on `mann-dev`:

```bash
rsync -a --delete \
  --exclude .git \
  --exclude node_modules \
  --exclude .next \
  --exclude .env \
  --exclude .vercel \
  --exclude 'production-export-*' \
  --exclude dataset.tar.gz \
  ~/projects/haar-atelier-nextjs/ \
  /opt/services/haar-atelier-nextjs/current/

cd /opt/services/haar-atelier-nextjs
docker compose up -d --build app
```

Smoke test after deploy:

```bash
curl -fsS -I https://haar.manndigital.nl
curl -fsS -I https://haar.manndigital.nl/shop
```

A transient `502` can occur immediately while the container restarts. Retry after Next.js logs `Ready`.

## Validation

From repo root:

```bash
pnpm exec tsc --noEmit
pnpm build
pnpm exec next lint
```

Checkout E2E:

```bash
stripe listen --forward-to https://haar.manndigital.nl/api/stripe-webhook
E2E_BASE_URL=https://haar.manndigital.nl pnpm test:e2e
```

If `stripe listen` is restarted, sync its new webhook signing secret into runtime env without printing it, then recreate the app container.

## Notes

- `DATABASE_URL` points at the local Compose PostgreSQL service, replacing the old remote/Railway database.
- Only ingress Caddy publishes public ports 80/443.
- PostgreSQL state should be backed up before risky deploys or DB migrations.
- Remaining modernization backlog is tracked in the ICM workspace final report.
