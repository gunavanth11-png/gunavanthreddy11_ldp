
def divide_numbers(first_number, second_number):
    try:
        result = first_number / second_number
        print("Result:", result)

    except ZeroDivisionError:
        print("Error: Cannot divide by zero.")

    except TypeError:
        print("Error: Please enter valid numbers.")

    finally:
        print("Division operation completed.")


divide_numbers(20, 5)
divide_numbers(20, 0)
