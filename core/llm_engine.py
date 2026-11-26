"""
core/llm_engine.py
LLM translation engine: converts natural language to SQLite SQL.
Uses OpenAI GPT if OPENAI_API_KEY is set, otherwise falls back to
the built-in deterministic keyword engine so demos work offline.
"""

import os
import re

from .prompt_builder import build_prompt


def _openai_generate(prompt: str) -> str:
    """Calls OpenAI Chat Completions API and returns the raw SQL string."""
    try:
        import openai  # type: ignore

        client = openai.OpenAI(api_key=os.environ["OPENAI_API_KEY"])
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0,
            max_tokens=512,
        )
        return response.choices[0].message.content.strip()
    except Exception as exc:
        raise RuntimeError(f"OpenAI API call failed: {exc}") from exc


def _keyword_fallback(question: str) -> str:
    """
    Deterministic keyword-based SQL generator.
    Used when no OPENAI_API_KEY is available — guarantees demo stability.
    """
    q = question.lower()

    if "top" in q and ("customer" in q or "spending" in q or "spend" in q):
        return (
            "SELECT c.customer_id, c.name, ROUND(SUM(o.total_amount), 2) AS total_spent "
            "FROM customers c "
            "JOIN orders o ON c.customer_id = o.customer_id "
            "WHERE o.status != 'Cancelled' "
            "GROUP BY c.customer_id, c.name "
            "ORDER BY total_spent DESC "
            "LIMIT 5;"
        )

    if "stock" in q or "inventory" in q or "low" in q:
        return (
            "SELECT product_id, name, category, price, stock_quantity "
            "FROM products "
            "WHERE stock_quantity < 20 "
            "ORDER BY stock_quantity ASC;"
        )

    if "country" in q or "revenue" in q:
        return (
            "SELECT c.country, COUNT(DISTINCT o.order_id) AS total_orders, "
            "ROUND(SUM(o.total_amount), 2) AS total_revenue "
            "FROM customers c "
            "JOIN orders o ON c.customer_id = o.customer_id "
            "WHERE o.status != 'Cancelled' "
            "GROUP BY c.country "
            "ORDER BY total_revenue DESC;"
        )

    if "best" in q or "selling" in q:
        return (
            "SELECT p.product_id, p.name, p.category, SUM(oi.quantity) AS total_units_sold "
            "FROM products p "
            "JOIN order_items oi ON p.product_id = oi.product_id "
            "JOIN orders o ON oi.order_id = o.order_id "
            "WHERE o.status = 'Delivered' "
            "GROUP BY p.product_id, p.name, p.category "
            "ORDER BY total_units_sold DESC "
            "LIMIT 3;"
        )

    if "tier" in q or "loyalty" in q:
        return (
            "SELECT c.loyalty_tier, COUNT(DISTINCT c.customer_id) AS members, "
            "ROUND(AVG(o.total_amount), 2) AS avg_spend "
            "FROM customers c "
            "JOIN orders o ON c.customer_id = o.customer_id "
            "WHERE o.status = 'Delivered' "
            "GROUP BY c.loyalty_tier "
            "ORDER BY avg_spend DESC;"
        )

    if "never" in q or "inactive" in q:
        return (
            "SELECT c.customer_id, c.name, c.email, c.signup_date "
            "FROM customers c "
            "LEFT JOIN orders o ON c.customer_id = o.customer_id "
            "WHERE o.order_id IS NULL;"
        )

    # Default safe fallback
    return "SELECT customer_id, name, country, loyalty_tier FROM customers LIMIT 5;"


def _extract_sql(raw: str) -> str:
    """Strips markdown code fences from LLM output if present."""
    match = re.search(r"```(?:sql)?\s*(.*?)```", raw, re.DOTALL | re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return raw.strip()


def generate_sql(question: str, schema_text: str) -> str:
    """
    Main entry point: converts a natural language question to a SQL query.

    Args:
        question:    The user's natural language question.
        schema_text: The database schema context string.

    Returns:
        A raw SQL string (not yet validated/sanitized).
    """
    api_key = os.environ.get("OPENAI_API_KEY", "").strip()

    if api_key:
        prompt = build_prompt(question, schema_text)
        raw = _openai_generate(prompt)
        return _extract_sql(raw)

    # Offline / demo mode
    return _keyword_fallback(question)
