SELECT email FROM lab.customers;
SELECT COUNT(*) FROM lab.customers;

INSERT INTO lab.customers (email) VALUES ('you@example.com')
ON CONFLICT (email) DO NOTHING;

INSERT INTO lab.customers (email) VALUES ('you@example.com')
ON CONFLICT (email) DO NOTHING;

SELECT * FROM lab.customers ORDER BY customer_id;
