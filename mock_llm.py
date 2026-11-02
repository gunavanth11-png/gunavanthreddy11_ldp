
import re
import sqlite3

DATABASE_NAME = "company_db.db"


def get_database_schema():
    """Read table and column names from the existing SQLite database."""
    connection = sqlite3.connect(DATABASE_NAME)

    try:
        cursor = connection.cursor()
        cursor.execute(
            "SELECT name FROM sqlite_master "
            "WHERE type = 'table' AND name NOT LIKE 'sqlite_%'"
        )
        tables = cursor.fetchall()

        schema = {}

        for (table_name,) in tables:
            # Table names come from SQLite's own metadata.
            safe_table = table_name.replace('"', '""')
            cursor.execute(f'PRAGMA table_info("{safe_table}")')
            schema[table_name] = [
                column[1] for column in cursor.fetchall()
            ]

        return schema
    finally:
        connection.close()


def ask_mock_llm(prompt):
    """
    Return a predefined response instead of calling the OpenAI API.
    The response format is compatible with the two project stages.
    """
    prompt_lower = prompt.lower()

    if "refine" in prompt_lower or "refinement" in prompt_lower:
        return "Show all employees"

    schema = get_database_schema()
    table_names = list(schema.keys())

    employee_table = next(
        (table for table in table_names
         if "employee" in table.lower()),
        None
    )

    department_table = next(
        (table for table in table_names
         if "department" in table.lower()),
        None
    )

    # Try to identify the user's question from the SQL-generation prompt.
    question_match = re.search(
        r"(?:user question|original question|question)\s*:\s*(.+)",
        prompt,
        re.IGNORECASE
    )

    question = question_match.group(1).strip().lower() if question_match else prompt_lower

    if not employee_table:
        return "ERROR: No employee table was found in the database."

    safe_employee = employee_table.replace('"', '""')

    if "count" in question or "how many" in question or "total number" in question:
        return f'SELECT COUNT(*) AS total_employees FROM "{safe_employee}"'

    if "department" in question and department_table:
        employee_columns = schema[employee_table]
        department_columns = schema[department_table]

        employee_department_column = next(
            (column for column in employee_columns
             if "department" in column.lower()),
            None
        )

        department_name_column = next(
            (column for column in department_columns
             if "name" in column.lower()),
            None
        )

        department_id_column = next(
            (column for column in department_columns
             if column.lower() == "id"
             or "department_id" in column.lower()),
            None
        )

        if (
                employee_department_column
                and department_name_column
                and department_id_column
        ):
            safe_department = department_table.replace('"', '""')
            safe_emp_dept = employee_department_column.replace('"', '""')
            safe_dept_id = department_id_column.replace('"', '""')
            safe_dept_name = department_name_column.replace('"', '""')

            return (
                f'SELECT e.* FROM "{safe_employee}" AS e '
                f'JOIN "{safe_department}" AS d '
                f'ON e."{safe_emp_dept}" = d."{safe_dept_id}" '
                f'WHERE LOWER(d."{safe_dept_name}") '
                f"LIKE '%it%'"
            )

    if "show all employees" in question or "list all employees" in question:
        return f'SELECT * FROM "{safe_employee}"'

    return (
        "UNSUPPORTED: This question is not supported by the mock system. "
        "Try asking to show all employees or count employees."
    )
