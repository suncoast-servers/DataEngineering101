# Capstone — batch ETL

Lightweight batch pipeline (no Airflow required on small VPSes). Orchestration lesson path can add Airflow later.

## Run

From this directory:

```bash
cp ../core/.env.example ../core/.env
docker compose --profile batch build
docker compose --profile batch up -d postgres minio
docker compose --profile batch run --rm etl
```

## What it does

1. Reads seed CSV from the image.
2. Loads rows into `staging.orders`.
3. Builds `analytics.daily_order_counts` (idempotent merge).

Extend with MinIO export in your portfolio variant.
