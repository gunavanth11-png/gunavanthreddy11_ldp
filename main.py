
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


if __name__ == "__main__":
    main()
