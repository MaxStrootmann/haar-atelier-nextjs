# haar-atelier-nextjs

Production Next.js storefront for Haar Atelier.

## Runtime

- Host: `mann-dev`
- Service root: `/opt/services/haar-atelier-nextjs`
- Compose project: `haar-atelier-nextjs`
- App container: Next.js standalone on port `3000`
- Database: containerized PostgreSQL 16
- Ingress: shared Caddy at `/opt/services/ingress-caddy`
- Temporary public domain: `haar.manndigital.nl`

## State

- PostgreSQL data: `/var/lib/services/haar-atelier-nextjs/postgres`
- Runtime env: `/home/mann/.varlock/env/websites/haar-atelier-nextjs.env`
- PostgreSQL password file: `/opt/services/haar-atelier-nextjs/config/postgres_password`

## Operations

```bash
cd /opt/services/haar-atelier-nextjs
docker compose up -d --build
docker compose logs -f app
docker compose exec app npx prisma db push
```

## Notes

- `DATABASE_URL` points at the local Compose PostgreSQL service, replacing the old remote/Railway database.
- Only ingress Caddy publishes public ports 80/443.
