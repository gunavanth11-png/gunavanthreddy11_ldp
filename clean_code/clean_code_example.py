
def calculate_annual_salary(monthly_salary):
    return monthly_salary * 12


def calculate_total_expenses(first_expense, second_expense):
    return first_expense + second_expense


def display_employee_details(employee_name, monthly_salary):
    annual_salary = calculate_annual_salary(monthly_salary)

    print("Employee Name:", employee_name)
    print("Monthly Salary:", monthly_salary)
    print("Annual Salary:", annual_salary)


display_employee_details("Rahul", 30000)

total_expenses = calculate_total_expenses(5000, 10000)

print("Total Expenses:", total_expenses)
