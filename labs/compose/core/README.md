# Core lab stack

Postgres + MinIO for Paths 0–3 and shared services for capstones.

```bash
cp .env.example .env
docker compose --profile core up -d
docker compose ps
```

Stop without removing data:

```bash
docker compose --profile core down
```

Tear down including volumes (destructive):

```bash
docker compose --profile core down -v
```
