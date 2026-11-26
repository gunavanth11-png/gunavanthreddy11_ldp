 feature/text-sql-task
 feature/text-sql-task



import sqlite3
import re
import os
import sys
import time
from tabulate import tabulate


if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

def get_database_connection(db_path: str = "ecommerce.db") -> sqlite3.Connection:
    """Creates SQLite database and seeds realistic retail records if empty."""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    
    cursor = conn.cursor()
    

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS customers (
        customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        country TEXT NOT NULL,
        loyalty_tier TEXT CHECK(loyalty_tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
        signup_date DATE NOT NULL
    );
    """)

    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        stock_quantity INTEGER NOT NULL DEFAULT 0
    );
    """)


    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        order_date DATE NOT NULL,
        status TEXT CHECK(status IN ('Delivered', 'Shipped', 'Pending', 'Cancelled')),
        total_amount REAL NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );
    """)


    cursor.execute("""
    CREATE TABLE IF NOT EXISTS order_items (
        order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
    """)


    cursor.execute("SELECT COUNT(*) FROM customers")
    if cursor.fetchone()[0] == 0:
        customers = [
            ("Alice Johnson", "alice@example.com", "USA", "Platinum", "2023-01-15"),
            ("Bob Smith", "bob@example.com", "UK", "Gold", "2023-03-22"),
            ("Carlos Gomez", "carlos@example.com", "Spain", "Silver", "2023-05-10"),
            ("Diana Prince", "diana@example.com", "USA", "Platinum", "2023-06-01"),
            ("Evan Wright", "evan@example.com", "Canada", "Bronze", "2023-07-18"),
            ("Fiona Gallagher", "fiona@example.com", "UK", "Silver", "2023-08-30"),
            ("George Miller", "george@example.com", "Australia", "Gold", "2023-09-12"),
            ("Hanna Schmidt", "hanna@example.com", "Germany", "Bronze", "2023-10-05"),
            ("Quentin Tarantino", "quentin@example.com", "USA", "Silver", "2024-01-10"),
            ("Rachel Green", "rachel@example.com", "USA", "Bronze", "2024-02-14")
        ]
        cursor.executemany("INSERT INTO customers (name, email, country, loyalty_tier, signup_date) VALUES (?, ?, ?, ?, ?)", customers)

        products = [
            ("Wireless Headphones", "Electronics", 249.99, 45),
            ("Mechanical Keyboard", "Electronics", 129.99, 15),
            ("34-inch Monitor", "Electronics", 499.99, 8),
            ("Office Chair", "Furniture", 299.50, 20),
            ("Running Shoes", "Footwear", 119.95, 55),
            ("Mountain Jacket", "Apparel", 199.99, 12),
            ("Espresso Machine", "Kitchen", 349.00, 14),
            ("Aviator Sunglasses", "Accessories", 95.00, 7)
        ]
        cursor.executemany("INSERT INTO products (name, category, price, stock_quantity) VALUES (?, ?, ?, ?)", products)

        orders = [
            (1, 1, "2024-01-10", "Delivered", 499.98),
            (2, 2, "2024-01-12", "Delivered", 349.00),
            (3, 3, "2024-01-15", "Delivered", 299.50),
            (4, 4, "2024-02-01", "Delivered", 749.98),
            (5, 5, "2024-02-10", "Cancelled", 129.99),
            (6, 6, "2024-02-15", "Delivered", 199.99),
            (7, 7, "2024-03-01", "Delivered", 444.00),
            (8, 9, "2024-03-12", "Delivered", 1349.47),
            (9, 10, "2024-03-20", "Delivered", 1257.98),
            (10, 1, "2024-04-05", "Pending", 119.95)
        ]
        cursor.executemany("INSERT INTO orders (order_id, customer_id, order_date, status, total_amount) VALUES (?, ?, ?, ?, ?)", orders)

        order_items = [
            (1, 1, 2, 249.99),
            (2, 7, 1, 349.00),
            (3, 4, 1, 299.50),
            (4, 3, 1, 499.99),
            (4, 1, 1, 249.99),
            (5, 2, 1, 129.99),
            (6, 6, 1, 199.99),
            (7, 8, 1, 95.00),
            (7, 7, 1, 349.00),
            (8, 3, 2, 499.99),
            (8, 7, 1, 349.00),
            (9, 1, 3, 249.99),
            (9, 4, 1, 299.50),
            (9, 8, 2, 95.00),
            (10, 5, 1, 119.95)
        ]
        cursor.executemany("INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)", order_items)
        conn.commit()

    return conn




def get_schema_context(conn: sqlite3.Connection) -> str:
    """Dynamically extracts schema, table columns, types, and relations for the LLM."""
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
    tables = [row[0] for row in cursor.fetchall()]

    schema_repr = []
    for table in tables:
        cursor.execute(f"PRAGMA table_info({table});")
        cols = [f"{col[1]} ({col[2]})" for col in cursor.fetchall()]
        schema_repr.append(f"Table `{table}`: {', '.join(cols)}")
    
    return "\n".join(schema_repr)




FEW_SHOT_EXAMPLES = """
Example 1:
Question: Show me the top 5 customers by total spending
SQL:
SELECT c.customer_id, c.name, c.country, c.loyalty_tier, ROUND(SUM(o.total_amount), 2) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.status = 'Delivered'
GROUP BY c.customer_id, c.name, c.country, c.loyalty_tier
ORDER BY total_spent DESC
LIMIT 5;

Example 2:
Question: Which products are low on stock with fewer than 20 items?
SQL:
SELECT product_id, name, category, price, stock_quantity
FROM products
WHERE stock_quantity < 20
ORDER BY stock_quantity ASC;

Example 3:
Question: What is the total revenue and order count for each country?
SQL:
SELECT c.country, COUNT(DISTINCT o.order_id) AS total_orders, ROUND(SUM(o.total_amount), 2) AS total_revenue
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.status != 'Cancelled'
GROUP BY c.country
ORDER BY total_revenue DESC;
"""

def generate_sql(question: str, schema_text: str) -> str:
    """
    Translates Natural Language to SQL.
    Uses OpenAI if OPENAI_API_KEY is present; otherwise uses the built-in Semantic Matcher.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key:
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key)
            system_prompt = f"""You are an expert SQLite engineer.
Generate only standard, optimized SQLite queries based on this schema:
{schema_text}

Rules:
- Read-only SELECT queries only.
- Do not use SELECT *; select specific columns.
- Use explicit table aliases and JOINs.
- Wrap output in ```sql ... ``` fences.
"""
            user_prompt = f"{FEW_SHOT_EXAMPLES}\nQuestion: {question}\nSQL:"
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.0
            )
            raw = response.choices[0].message.content or ""
            
            match = re.search(r"```(?:sql)?\s*([\s\S]*?)\s*```", raw)
            return match.group(1).strip() if match else raw.strip()
        except Exception:
            pass  

    
    q = question.lower().strip()
    if "top" in q and ("customer" in q or "spend" in q):
        return """SELECT c.customer_id, c.name, c.country, c.loyalty_tier, ROUND(SUM(o.total_amount), 2) AS total_spent
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.status = 'Delivered'
GROUP BY c.customer_id, c.name, c.country, c.loyalty_tier
ORDER BY total_spent DESC
LIMIT 5;"""

    if "stock" in q or "inventory" in q:
        return """SELECT product_id, name, category, price, stock_quantity
FROM products
WHERE stock_quantity < 20
ORDER BY stock_quantity ASC;"""

    if "country" in q:
        return """SELECT c.country, COUNT(DISTINCT o.order_id) AS total_orders, ROUND(SUM(o.total_amount), 2) AS total_revenue
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.status != 'Cancelled'
GROUP BY c.country
ORDER BY total_revenue DESC;"""

    if "best" in q or "selling" in q:
        return """SELECT p.product_id, p.name, p.category, SUM(oi.quantity) AS total_units_sold
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
WHERE o.status = 'Delivered'
GROUP BY p.product_id, p.name, p.category
ORDER BY total_units_sold DESC
LIMIT 3;"""

    if "tier" in q or "loyalty" in q:
        return """SELECT c.loyalty_tier, COUNT(DISTINCT c.customer_id) AS members, ROUND(AVG(o.total_amount), 2) AS avg_spend
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.status = 'Delivered'
GROUP BY c.loyalty_tier
ORDER BY avg_spend DESC;"""

    if "never" in q or "inactive" in q:
        return """SELECT c.customer_id, c.name, c.email, c.signup_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;"""

    
    return "SELECT customer_id, name, country, loyalty_tier FROM customers LIMIT 5;"




def validate_and_sanitize(sql: str, conn: sqlite3.Connection):
    """
    Enforces security rules:
    1. Only SELECT queries allowed (read-only).
    2. Blocks destructive keywords (DROP, DELETE, UPDATE, INSERT, ALTER).
    3. Blocks multiple statements to prevent SQL injection.
    4. Validates syntax via SQLite EXPLAIN.
    """
    clean_sql = sql.strip().rstrip(";")
    upper = clean_sql.upper()


    if not (upper.startswith("SELECT") or upper.startswith("WITH")):
        return False, "Security Error: Only SELECT queries are permitted.", clean_sql


    if ";" in clean_sql:
        return False, "Security Error: Multi-statement execution blocked (SQL injection prevention).", clean_sql

    
    forbidden = [r"\bDROP\b", r"\bDELETE\b", r"\bUPDATE\b", r"\bINSERT\b", r"\bALTER\b", r"\bTRUNCATE\b"]
    for pat in forbidden:
        if re.search(pat, upper):
            return False, f"Security Error: Forbidden command detected.", clean_sql

    
    try:
        cursor = conn.cursor()
        cursor.execute(f"EXPLAIN {clean_sql}")
    except sqlite3.Error as e:
        return False, f"SQL Syntax Error: {str(e)}", clean_sql

    if "LIMIT" not in upper:
        clean_sql += " LIMIT 50"

    return True, None, clean_sql




def run_text_to_sql(question: str, conn: sqlite3.Connection):
    """Runs the full Text-to-SQL pipeline and displays clean, formatted results."""
    print("=" * 72)
    print(f"USER QUESTION: \"{question}\"")
    print("=" * 72)

    
    schema_text = get_schema_context(conn)

    raw_sql = generate_sql(question, schema_text)

    
    is_valid, err_msg, safe_sql = validate_and_sanitize(raw_sql, conn)
    if not is_valid:
        print(f"[X] BLOCKED: {err_msg}")
        return

    print(f"\n[OK] GENERATED SQL QUERY:\n{safe_sql}\n")

    
    start_time = time.perf_counter()
    cursor = conn.cursor()
    cursor.execute(safe_sql)
    rows = cursor.fetchall()
    elapsed_ms = round((time.perf_counter() - start_time) * 1000, 2)
    col_names = [desc[0] for desc in cursor.description]

    print(f"Execution Latency: {elapsed_ms} ms | Rows Returned: {len(rows)}")


    if rows:
        data = [[row[col] for col in col_names] for row in rows]
        print(tabulate(data, headers=col_names, tablefmt="grid"))
    else:
        print("(No matching records found)")

    
    print(f"\nEXECUTIVE SUMMARY: Retrieved {len(rows)} record(s) answering: \"{question}\".\n")



def main():
    conn = get_database_connection()

    
    demo_questions = [
        "Show me the top 5 customers by total spending",
        "Which products are low on stock with fewer than 20 items?",
        "What is the total revenue and order count for each country?",
        "List the top 3 best-selling products by quantity sold",
        "What is the average order value for each customer loyalty tier?"
    ]

    if len(sys.argv) > 1:
        
        custom_question = " ".join(sys.argv[1:])
        run_text_to_sql(custom_question, conn)
    else:
      
        print("\n" + "=" * 72)
        print("          TEXT-TO-SQL AI SYSTEM - DEMONSTRATION")
        print("=" * 72 + "\n")
        
        for q in demo_questions[:3]:
            run_text_to_sql(q, conn)

        print("\n" + "=" * 72)
        print("Tip: You can ask custom questions by running:")
        print('  python main.py "your question here"')
        print("=" * 72)
=======
 feature/prompt-engineering-sql

import sqlite3

from mock_llm import ask_mock_llm, get_database_schema

DATABASE_NAME = "company_db.db"


def execute_sql(sql):
    """Execute read-only SQL and return column names and rows."""

    if not sql.strip().upper().startswith("SELECT"):
        raise ValueError("Only SELECT queries are allowed.")

    connection = sqlite3.connect(
        f"file:{DATABASE_NAME}?mode=ro",
        uri=True
    )

    try:
        cursor = connection.cursor()
        cursor.execute(sql)

        column_names = [
            description[0] for description in cursor.description
        ]
        rows = cursor.fetchall()

        return column_names, rows
    finally:
        connection.close()


def refine_question(question):
    """Mock Stage 1: refine a few supported questions."""
    normalized = question.strip().lower()

    if normalized in {
        "show all employees",
        "list all employees",
        "display all employees"
    }:
        return "Show all employees"

    if normalized in {
        "count employees",
        "count the total number of employees",
        "how many employees are there"
    }:
        return "Count the total number of employees"

    if "department" in normalized:
        return question.strip()

    return question.strip()


def generate_mock_sql(question):
    """Mock Stage 2: map supported questions to SQL."""
    schema = get_database_schema()

    employee_table = next(
        (name for name in schema if "employee" in name.lower()),
        None
    )

    if not employee_table:
        raise ValueError("No employee table exists in company_db.db.")

    safe_table = employee_table.replace('"', '""')
    normalized = question.lower()

    if "count" in normalized or "how many" in normalized or "total number" in normalized:
        return f'SELECT COUNT(*) AS total_employees FROM "{safe_table}"'

    if (
            "show all employees" in normalized
            or "list all employees" in normalized
            or "display all employees" in normalized
    ):
        return f'SELECT * FROM "{safe_table}"'

    if "department" in normalized:
        department_table = next(
            (name for name in schema if "department" in name.lower()),
            None
        )

        if department_table:
            employee_columns = schema[employee_table]
            department_columns = schema[department_table]

            employee_fk = next(
                (column for column in employee_columns
                 if "department" in column.lower()),
                None
            )
            department_id = next(
                (column for column in department_columns
                 if column.lower() == "id"
                 or "department_id" in column.lower()),
                None
            )
            department_name = next(
                (column for column in department_columns
                 if "name" in column.lower()),
                None
            )

            if employee_fk and department_id and department_name:
                safe_dept = department_table.replace('"', '""')
                safe_fk = employee_fk.replace('"', '""')
                safe_id = department_id.replace('"', '""')
                safe_name = department_name.replace('"', '""')

                return (
                    f'SELECT e.* FROM "{safe_table}" AS e '
                    f'JOIN "{safe_dept}" AS d '
                    f'ON e."{safe_fk}" = d."{safe_id}" '
                    f'WHERE LOWER(d."{safe_name}") LIKE \'%it%\''
                )

    raise ValueError(
        "Unsupported mock question. Try 'Show all employees' "
        "or 'Count employees'."
    )


def main():
    print("PROMPT ENGINEERING - TEXT TO SQL SYSTEM")
    print("Mode: MOCK - No OpenAI API calls or API charges")
    print()

    question = input("Enter your company data question: ")

    try:
        print("\nStage 1: Question Refinement")
        refined_question = refine_question(question)
        print("Refined question:", refined_question)

        print("\nStage 2: SQL Generation")
        sql = generate_mock_sql(refined_question)
        print("Generated SQL:", sql)

        print("\nStage 3: Database Execution")
        columns, rows = execute_sql(sql)

        print("\nStage 4: Results")
        print("Columns:", " | ".join(columns))

        if not rows:
            print("No records found.")
        else:
            for row in rows:
                print(row)

        print(f"\nTotal rows returned: {len(rows)}")

    except (ValueError, sqlite3.Error) as error:
        print("\nCould not complete the request:", error)

 main

if __name__ == "__main__":
    main()
=======
from dotenv import load_dotenv

from agents.research_agent import research_company
from ingestion.document_ingestion import ingest_documents
from rag.rag_pipeline import run_rag_pipeline


load_dotenv()


def main():

    print("=" * 65)
    print("       ADVANCED RAG BUSINESS ANALYSIS SYSTEM")
    print("=" * 65)

    companies = [
        "Microsoft",
        "Google",
        "Amazon"
    ]

    all_documents = []

    print("\nSTEP 1: AGENTS AND TOOLS")

    for company in companies:

        documents = research_company(company)

        all_documents.extend(documents)


    print("\nSTEP 2: DOCUMENT INGESTION")

    store = ingest_documents(all_documents)


    print("\nSTEP 3: QUERY CONSTRUCTION")

    question = input(
        "\nEnter your business analysis question: "
    )


    print("\nSTEP 4: ADVANCED RAG PIPELINE")

    response = run_rag_pipeline(
        question,
        companies,
        store
    )


    print("\n" + "=" * 65)
    print("FINAL ANSWER")
    print("=" * 65)

    print(response)

    print("\n" + "=" * 65)
    print("ADVANCED RAG EXECUTION COMPLETED")
    print("=" * 65)


if __name__ == "__main__":
  feature/text-sql-task
    main()
 main
=======
    main() main
main
