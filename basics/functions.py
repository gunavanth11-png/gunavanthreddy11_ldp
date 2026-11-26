
def calculate_annual_salary(monthly_salary):
    annual_salary = monthly_salary * 12
    return annual_salary


def display_employee_details(name, salary):
    print("Employee Name:", name)
    print("Monthly Salary:", salary)

    annual_salary = calculate_annual_salary(salary)

    print("Annual Salary:", annual_salary)


display_employee_details("Rahul", 30000)
display_employee_details("Priya", 40000)
