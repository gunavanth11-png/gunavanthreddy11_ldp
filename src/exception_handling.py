
class InvalidAgeError(Exception):
    pass


class InvalidMarksError(Exception):
    pass


def check_age(age):

    if age < 18:
        raise InvalidAgeError("Age must be 18 or above")

    return "Student is eligible"


def check_marks(marks):

    if marks < 0 or marks > 100:
        raise InvalidMarksError("Marks must be between 0 and 100")

    return "Marks are valid"


def demonstrate_exceptions():

    print("\n========== EXCEPTION HANDLING ==========")

    print("\n1. ZeroDivisionError")

    try:
        result = 10 / 0
        print(result)

    except ZeroDivisionError:
        print("Cannot divide by zero")

    print("\n2. ValueError")

    try:
        number = int("Python")
        print(number)

    except ValueError:
        print("Invalid value: Cannot convert text into integer")

    print("\n3. Multiple Exceptions")

    try:
        number = int(input("Enter a number: "))
        result = 100 / number
        print("Result:", result)

    except ValueError:
        print("Please enter a valid integer")

    except ZeroDivisionError:
        print("Division by zero is not allowed")

    else:
        print("Operation completed successfully")

    finally:
        print("Calculation process completed")

    print("\n4. Custom Exception - Age Validation")

    try:
        print(check_age(21))
        print(check_age(16))

    except InvalidAgeError as error:
        print("Age Error:", error)

    print("\n5. Custom Exception - Marks Validation")

    try:
        print(check_marks(85))
        print(check_marks(120))

    except InvalidMarksError as error:
        print("Marks Error:", error)

    print("\n6. Finally Block")

    try:
        print("Executing program")

    except Exception as error:
        print("Error:", error)

    finally:
        print("Finally block always executes")

    print("\nException Handling Completed")


if __name__ == "__main__":
    demonstrate_exceptions()
