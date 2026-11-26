
def calculate_salary(monthly_salary: float, bonus: float) -> float:
    annual_salary = monthly_salary * 12
    total_salary = annual_salary + bonus

    return total_salary


def display_salary(employee_name: str, salary: float) -> None:
    print("Employee:", employee_name)
    print("Annual Salary:", salary)


total_salary = calculate_salary(30000, 5000)

display_salary("Rahul", total_salary)
