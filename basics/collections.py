
employee_names = ["Rahul", "Priya", "Amit"]

employee_names.append("Sneha")
employee_names.remove("Amit")

print("List:", employee_names)

employee_details = ("Rahul", 25, "Developer")

print("Tuple:", employee_details)

employee_skills = {"Python", "Java", "SQL", "Python"}

print("Set:", employee_skills)

employee = {
    "id": 101,
    "name": "Rahul",
    "role": "Developer"
}

employee["salary"] = 35000

print("Dictionary:", employee)
print("Employee Name:", employee["name"])
print("Employee Salary:", employee["salary"])
