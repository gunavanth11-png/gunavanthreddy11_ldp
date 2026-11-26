
def write_employee_details():
    with open("employee.txt", "w", encoding="utf-8") as file:
        file.write("Employee Name: Rahul\n")
        file.write("Employee Role: Python Developer\n")
        file.write("Employee Salary: 35000\n")

    print("Employee details saved successfully.")


def read_employee_details():
    try:
        with open("employee.txt", "r", encoding="utf-8") as file:
            content = file.read()
            print("\nEmployee Details:")
            print(content)

    except FileNotFoundError:
        print("Employee file not found.")


write_employee_details()
read_employee_details()
