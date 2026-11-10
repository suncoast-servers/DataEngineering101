# Exercise — First queries

With the [core lab](/labs/) running:

1. List all emails in `lab.customers`.
2. Count customers.
3. Insert a new row with your email; run `ON CONFLICT DO NOTHING` behavior by inserting the same email twice.

Verify with:

```sql
SELECT * FROM lab.customers ORDER BY customer_id;
```

Solution: `labs/solutions/path-03-sql-01/queries.sql`
