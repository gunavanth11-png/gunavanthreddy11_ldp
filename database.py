
import sqlite3

DATABASE_NAME = "company_db.db"

SCHEMA = """
         CREATE TABLE IF NOT EXISTS departments (
                                                    id INTEGER PRIMARY KEY,
                                                    department_name TEXT NOT NULL
         );

         CREATE TABLE IF NOT EXISTS employees (
                                                  id INTEGER PRIMARY KEY,
                                                  name TEXT NOT NULL,
                                                  department_id INTEGER,
                                                  salary REAL,
                                                  FOREIGN KEY (department_id) REFERENCES departments(id)
             ); \
         """


def setup_database():
    connection = sqlite3.connect(DATABASE_NAME)

    connection.executescript(SCHEMA)

    department_count = connection.execute(
        "SELECT COUNT(*) FROM departments"
    ).fetchone()[0]

    if department_count == 0:
        connection.executemany(
            "INSERT INTO departments (id, department_name) VALUES (?, ?)",
            [
                (1, "Engineering"),
                (2, "HR"),
                (3, "Finance")
            ]
        )

        connection.executemany(
            "INSERT INTO employees (id, name, department_id, salary) VALUES (?, ?, ?, ?)",
            [
                (1, "Rahul", 1, 60000),
                (2, "Priya", 1, 75000),
                (3, "Amit", 2, 45000),
                (4, "Sneha", 3, 55000),
                (5, "Kiran", 1, 80000)
            ]
        )

    connection.commit()
    connection.close()


def execute_sql(sql_query):
    connection = sqlite3.connect(DATABASE_NAME)

    try:
        cursor = connection.execute(sql_query)
        columns = [column[0] for column in cursor.description] if cursor.description else []
        rows = cursor.fetchall()
        return columns, rows
    finally:
        connection.close()
