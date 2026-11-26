
import os
import json


def demonstrate_file_handling():

    print("\n========== FILE HANDLING ==========")

    file_name = "students.txt"

    print("\n1. Writing Data")

    with open(file_name, "w") as file:
        file.write("Student Name: Rahul\n")
        file.write("Course: Python\n")
        file.write("Age: 21\n")

    print("File created and data written successfully")

    print("\n2. Reading Complete File")

    with open(file_name, "r") as file:
        print(file.read())

    print("\n3. Reading One Line")

    with open(file_name, "r") as file:
        print(file.readline())

    print("\n4. Reading All Lines")

    with open(file_name, "r") as file:
        print(file.readlines())

    print("\n5. Appending Data")

    with open(file_name, "a") as file:
        file.write("City: Hyderabad\n")

    print("New data appended successfully")

    print("\n6. Writelines Demonstration")

    with open("subjects.txt", "w") as file:
        file.writelines([
            "Python\n",
            "Java\n",
            "SQL\n"
        ])

    print("Subjects saved successfully")

    print("\n7. Checking File Exists")

    if os.path.exists(file_name):
        print("File exists")
        print("File Size:", os.path.getsize(file_name), "bytes")

    print("\n8. JSON File Handling")

    student = {
        "id": 101,
        "name": "Rahul",
        "course": "Python",
        "age": 21
    }

    with open("student.json", "w") as file:
        json.dump(student, file, indent=4)

    print("JSON data saved successfully")

    with open("student.json", "r") as file:
        data = json.load(file)

    print("Retrieved Student Data:", data)

    print("\n9. File Exception Handling")

    try:
        with open("unknown.txt", "r") as file:
            print(file.read())

    except FileNotFoundError:
        print("Error: Requested file does not exist")

    print("\n10. File Modes")

    print("r - Read")
    print("w - Write")
    print("a - Append")
    print("x - Create new file")

    print("\nFile Handling Completed")


if __name__ == "__main__":
    demonstrate_file_handling()
