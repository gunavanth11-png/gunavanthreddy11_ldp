-- database/schema.sql
-- E-Commerce database schema for the Text-to-SQL demonstration system.
-- SQLite dialect with foreign-key constraints enabled via PRAGMA.

PRAGMA foreign_keys = ON;

-- ──────────────────────────────────────────────
-- 1. Customers
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
    customer_id  INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT    NOT NULL,
    email        TEXT    UNIQUE NOT NULL,
    country      TEXT    NOT NULL,
    loyalty_tier TEXT    CHECK(loyalty_tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
    signup_date  DATE    NOT NULL
);

-- ──────────────────────────────────────────────
-- 2. Products
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
    product_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT    NOT NULL,
    category       TEXT    NOT NULL,
    price          REAL    NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0
);

-- ──────────────────────────────────────────────
-- 3. Orders
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
    order_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id  INTEGER NOT NULL,
    order_date   DATE    NOT NULL,
    status       TEXT    CHECK(status IN ('Delivered', 'Shipped', 'Pending', 'Cancelled')),
    total_amount REAL    NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- ──────────────────────────────────────────────
-- 4. Order Items (line items)
-- ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id      INTEGER NOT NULL,
    product_id    INTEGER NOT NULL,
    quantity      INTEGER NOT NULL,
    unit_price    REAL    NOT NULL,
    FOREIGN KEY (order_id)   REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
