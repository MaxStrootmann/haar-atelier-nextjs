# Haar Atelier Next.js Webshop

Production Next.js storefront for Haar Atelier at:

```text
https://haar.manndigital.nl
```

This repository is the current deployment truth for the webshop. It is a Next.js/Sanity/Stripe storefront deployed as a Docker Compose service with local PostgreSQL on `mann-dev`.

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS and Sass
- Sanity content/data
- Stripe Checkout and webhooks
- Prisma with PostgreSQL
- Playwright E2E
- Fallow codebase analysis

## Local Development

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm exec tsc --noEmit
pnpm build
pnpm exec next lint
```

## E2E Checkout Test

The checkout E2E runs against the deployed URL by default via `playwright.config.ts`.

```bash
E2E_BASE_URL=https://haar.manndigital.nl pnpm test:e2e
```

The Stripe webhook listener must be running during checkout E2E validation:

```bash
stripe listen --forward-to https://haar.manndigital.nl/api/stripe-webhook
```

If the listener is restarted, sync the new webhook signing secret into the runtime env without printing it, then restart the app container.

## Fallow Codebase Audits

Run from the repo root:

```bash
npx fallow dead-code --format json --quiet --explain 2>/dev/null || true
npx fallow dupes --format json --quiet --explain 2>/dev/null || true
npx fallow health --format json --quiet --explain 2>/dev/null || true
```

Notes:

- Exit code `1` can mean findings exist, not command failure.
- Treat Fallow findings as review evidence, not automatic deletion permission.
- Current modernization pass reduced unused files/exports/types/cycles/dupes to zero.

## Deployment

See `SERVICE.md` for service paths and operations.

Current deployment root:

```text
/opt/services/haar-atelier-nextjs
```

Current source deployed into:

```text
/opt/services/haar-atelier-nextjs/current
```

Typical deploy from this repo on the host:

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

## Runtime Secrets

Runtime env is Varlock-backed. Do not print raw env values, Stripe keys, webhook secrets, or DB URLs.

Runtime env file location on the host:

```text
/home/mann/.varlock/env/websites/haar-atelier-nextjs.env
```

Current checkout mode is controlled explicitly by:

```text
STRIPE_MODE
NEXT_PUBLIC_STRIPE_MODE
```

## Known Deferred Work

- Add/verify recurring PostgreSQL and Payload media backup routine.
- Review remaining Fallow resolver/tooling findings:
  - retained build/tool packages: `sass`, `sharp`, `eslint-config-next`
  - public asset path resolver noise
  - generated Payload type exports
- Refactor Stripe webhook/API complexity only with additional safety tests.
- Optional manual visual QA after larger UI changes.
