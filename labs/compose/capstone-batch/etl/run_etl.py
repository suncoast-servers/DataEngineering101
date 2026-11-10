"""Minimal batch ETL for DE101 capstone — readable without frameworks."""
import csv
import os
from pathlib import Path

import psycopg


def main() -> None:
    database_url = os.environ["DATABASE_URL"]
    data_path = Path(__file__).parent / "data" / "orders.csv"
    with psycopg.connect(database_url) as conn:
        with conn.cursor() as cur:
            cur.execute("CREATE SCHEMA IF NOT EXISTS staging")
            cur.execute("CREATE SCHEMA IF NOT EXISTS analytics")
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS staging.orders (
                    order_id INT PRIMARY KEY,
                    customer_email TEXT NOT NULL,
                    order_date DATE NOT NULL,
                    amount_cents INT NOT NULL
                )
                """
            )
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS analytics.daily_order_counts (
                    order_date DATE PRIMARY KEY,
                    order_count INT NOT NULL,
                    revenue_cents BIGINT NOT NULL
                )
                """
            )
            cur.execute("TRUNCATE staging.orders")
            with data_path.open(newline="", encoding="utf-8") as fh:
                reader = csv.DictReader(fh)
                for row in reader:
                    cur.execute(
                        """
                        INSERT INTO staging.orders (order_id, customer_email, order_date, amount_cents)
                        VALUES (%s, %s, %s, %s)
                        """,
                        (
                            int(row["order_id"]),
                            row["customer_email"],
                            row["order_date"],
                            int(row["amount_cents"]),
                        ),
                    )
            cur.execute(
                """
                INSERT INTO analytics.daily_order_counts (order_date, order_count, revenue_cents)
                SELECT order_date, COUNT(*), SUM(amount_cents)
                FROM staging.orders
                GROUP BY order_date
                ON CONFLICT (order_date) DO UPDATE SET
                    order_count = EXCLUDED.order_count,
                    revenue_cents = EXCLUDED.revenue_cents
                """
            )
        conn.commit()
    print("ETL complete: staging.orders loaded, analytics.daily_order_counts updated.")


if __name__ == "__main__":
    main()
