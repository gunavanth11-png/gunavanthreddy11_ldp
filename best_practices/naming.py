
company_name = "ABC Technologies"
employee_count = 100
minimum_salary = 20000


def calculate_bonus(employee_salary):
    bonus_percentage = 10
    bonus_amount = employee_salary * bonus_percentage / 100

    return bonus_amount


bonus = calculate_bonus(30000)

print("Company:", company_name)
print("Employee Count:", employee_count)
print("Minimum Salary:", minimum_salary)
print("Employee Bonus:", bonus)
