-- Seed schema for SQL exercises (idempotent)
CREATE TABLE IF NOT EXISTS lab.customers (
    customer_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO lab.customers (email)
VALUES ('learner@example.com')
ON CONFLICT (email) DO NOTHING;
