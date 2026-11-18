"""
core/prompt_builder.py
Builds structured few-shot prompts for the LLM Text-to-SQL pipeline.
"""

FEW_SHOT_EXAMPLES = [
    {
        "question": "Show me the top 5 customers by total spending",
        "sql": (
            "SELECT c.customer_id, c.name, ROUND(SUM(o.total_amount), 2) AS total_spent "
            "FROM customers c "
            "JOIN orders o ON c.customer_id = o.customer_id "
            "WHERE o.status != 'Cancelled' "
            "GROUP BY c.customer_id, c.name "
            "ORDER BY total_spent DESC "
            "LIMIT 5;"
        ),
    },
    {
        "question": "Which products are low on stock with fewer than 20 items?",
        "sql": (
            "SELECT product_id, name, category, price, stock_quantity "
            "FROM products "
            "WHERE stock_quantity < 20 "
            "ORDER BY stock_quantity ASC;"
        ),
    },
    {
        "question": "What is the total revenue and order count for each country?",
        "sql": (
            "SELECT c.country, COUNT(DISTINCT o.order_id) AS total_orders, "
            "ROUND(SUM(o.total_amount), 2) AS total_revenue "
            "FROM customers c "
            "JOIN orders o ON c.customer_id = o.customer_id "
            "WHERE o.status != 'Cancelled' "
            "GROUP BY c.country "
            "ORDER BY total_revenue DESC;"
        ),
    },
]

SYSTEM_INSTRUCTIONS = """
You are an expert SQLite query generator.
Rules:
1. Only generate SELECT queries — never INSERT, UPDATE, DELETE, DROP, or ALTER.
2. Always use table aliases for readability.
3. Always include a LIMIT clause unless the question explicitly asks for all rows.
4. Prefer ROUND(..., 2) for monetary amounts.
5. Use double-quoted identifiers only when column names conflict with SQL keywords.
""".strip()


def build_prompt(question: str, schema_text: str) -> str:
    """
    Constructs the full prompt string sent to the LLM.

    Args:
        question:    The user's natural language question.
        schema_text: The dynamically introspected database schema.

    Returns:
        A fully formatted prompt string with system instructions,
        schema context, few-shot examples, and the target question.
    """
    examples_block = "\n\n".join(
        f"Q: {ex['question']}\nSQL: {ex['sql']}" for ex in FEW_SHOT_EXAMPLES
    )

    prompt = (
        f"{SYSTEM_INSTRUCTIONS}\n\n"
        f"### Database Schema\n{schema_text}\n\n"
        f"### Examples\n{examples_block}\n\n"
        f"### Question\nQ: {question}\nSQL:"
    )
    return prompt
