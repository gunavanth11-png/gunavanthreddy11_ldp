"""
core/validator.py
Security guardrails for the Text-to-SQL pipeline.
Enforces read-only access, blocks SQL injection, and validates syntax.
"""

import re
import sqlite3


# Patterns for dangerous DML/DDL keywords
_FORBIDDEN_PATTERNS = [
    r"\bDROP\b",
    r"\bDELETE\b",
    r"\bUPDATE\b",
    r"\bINSERT\b",
    r"\bALTER\b",
    r"\bTRUNCATE\b",
    r"\bCREATE\b",
    r"\bREPLACE\b",
    r"\bATTACH\b",
    r"\bDETACH\b",
]

DEFAULT_ROW_LIMIT = 50


def validate_and_sanitize(
    sql: str,
    conn: sqlite3.Connection,
    row_limit: int = DEFAULT_ROW_LIMIT,
) -> tuple[bool, str | None, str]:
    """
    Validates and sanitizes a generated SQL query.

    Checks applied (in order):
    1. Must start with SELECT or WITH (read-only enforcement).
    2. No semicolons inside the query (stacked-statement injection guard).
    3. No forbidden DML/DDL keywords.
    4. SQLite EXPLAIN syntax check.
    5. Auto-injects LIMIT if absent.

    Args:
        sql:       The raw SQL string to validate.
        conn:      An active SQLite connection used for EXPLAIN validation.
        row_limit: Maximum rows to auto-inject if LIMIT is missing.

    Returns:
        A tuple of (is_valid: bool, error_message: str | None, safe_sql: str).
        On failure, is_valid is False and error_message contains the reason.
        On success, safe_sql is the validated (and possibly LIMIT-appended) query.
    """
    clean_sql = sql.strip().rstrip(";")
    upper = clean_sql.upper()

    # Rule 1: Only SELECT / WITH allowed
    if not (upper.startswith("SELECT") or upper.startswith("WITH")):
        return False, "Security Error: Only SELECT queries are permitted.", clean_sql

    # Rule 2: Block stacked statements (SQL injection)
    if ";" in clean_sql:
        return (
            False,
            "Security Error: Multi-statement execution blocked (SQL injection prevention).",
            clean_sql,
        )

    # Rule 3: Block dangerous keywords
    for pattern in _FORBIDDEN_PATTERNS:
        if re.search(pattern, upper):
            keyword = pattern.replace(r"\b", "").replace("\\b", "")
            return (
                False,
                f"Security Error: Forbidden command detected — {keyword}.",
                clean_sql,
            )

    # Rule 4: SQLite EXPLAIN syntax check
    try:
        cursor = conn.cursor()
        cursor.execute(f"EXPLAIN {clean_sql}")
    except sqlite3.Error as exc:
        return False, f"SQL Syntax Error: {exc}", clean_sql

    # Rule 5: Auto-inject LIMIT for safety
    if "LIMIT" not in upper:
        clean_sql += f" LIMIT {row_limit}"

    return True, None, clean_sql
