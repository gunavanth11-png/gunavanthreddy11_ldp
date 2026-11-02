# Text-to-SQL System: Mentor Presentation Guide

A streamlined, production-ready system that leverages Large Language Models (LLMs) to convert natural language queries into accurate, secure, and optimized SQL queries.

---

## 1. Selected Use Case: E-Commerce & Retail Intelligence

To demonstrate real-world enterprise capability, we implemented an **E-Commerce Sales & Inventory Database** with 4 relational tables:
- **`customers`**: Customer profiles (`customer_id`, `name`, `email`, `country`, `loyalty_tier`, `signup_date`)
- **`products`**: Product catalog (`product_id`, `name`, `category`, `price`, `stock_quantity`)
- **`orders`**: Transaction orders (`order_id`, `customer_id`, `order_date`, `status`, `total_amount`)
- **`order_items`**: Line items per order (`order_item_id`, `order_id`, `product_id`, `quantity`, `unit_price`)

---

## 2. System Architecture & Flow

```
[ User Natural Language Question ]
               │
               ▼
   [ 1. Dynamic Schema Introspection ] ──> Extracts tables, columns & foreign keys
               │
               ▼
   [ 2. Prompt & Few-Shot Engineering ] ──> Injects schema context & SQL rules
               │
               ▼
   [ 3. LLM Translation Engine ] ──> Converts question to SQLite query
               │
               ▼
   [ 4. Security Guardrails ] ──> Enforces read-only; blocks DROP, DELETE & injection
               │
               ▼
   [ 5. Syntax Validation ] ──> Validates legality with SQLite EXPLAIN
               │
               ▼
   [ 6. Execution & Explanation ] ──> Executes query, measures latency & prints table
```

---

## 3. How to Run for Demonstration

### Run the Default Demonstration Suite
```powershell
python main.py
```
*Executes top benchmark queries automatically with formatted ASCII tables and execution latency.*

### Run Any Custom Question
```powershell
python main.py "Show me the top 5 customers by total spending"
python main.py "Which products are low on stock with fewer than 20 items?"
python main.py "What is the total revenue and order count for each country?"
python main.py "List the top 3 best-selling products by quantity sold"
python main.py "What is the average order value for each customer loyalty tier?"
```

---

## 4. Easy Code Explanation ([main.py](file:///c:/Users/pr749/IdeaProjects/text-sql-task/main.py))

The solution is contained in a single, well-structured script organized into 6 clear sections:

1. **Section 1: Database Setup & Seed Data (`get_database_connection`)**:
   Automatically initializes SQLite database (`ecommerce.db`) with relational constraints, foreign keys, and realistic sample data.
2. **Section 2: Dynamic Schema Introspection (`get_schema_context`)**:
   Inspects SQLite master and table PRAGMAs dynamically so the LLM always has the ground-truth schema without hardcoding.
3. **Section 3: LLM Prompt Engineering & Translation (`generate_sql`)**:
   Uses in-context few-shot learning. Connects to OpenAI if `OPENAI_API_KEY` is provided, or uses the built-in deterministic translation engine so demonstrations never fail offline.
4. **Section 4: Security Guardrails (`validate_and_sanitize`)**:
   Blocks mutating queries (`DROP`, `DELETE`, `UPDATE`, `INSERT`, `ALTER`), prevents stacked-query SQL injection, validates syntax via `EXPLAIN`, and injects safety `LIMIT` clauses.
5. **Section 5: Execution & Presentation (`run_text_to_sql`)**:
   Executes the validated query, captures execution latency in milliseconds, formats tabular data using `tabulate`, and provides an executive summary.
6. **Section 6: Main Entrypoint (`main`)**:
   Handles CLI input and runs the demo suite.
