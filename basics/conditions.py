
employee_name = input("Enter employee name: ")
employee_salary = float(input("Enter monthly salary: "))

if employee_salary >= 50000:
    salary_category = "High Salary"
elif employee_salary >= 30000:
    salary_category = "Medium Salary"
else:
    salary_category = "Entry Level Salary"

print("Employee:", employee_name)
print("Salary Category:", salary_category)
