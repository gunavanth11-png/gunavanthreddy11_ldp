
import math
import random
import datetime
import statistics

from math import sqrt, factorial
from random import randint


def addition(a, b):
    return a + b


def subtraction(a, b):
    return a - b


def multiplication(a, b):
    return a * b


def division(a, b):
    return a / b


def demonstrate_modules():

    print("\n========== MODULES AND PACKAGES ==========")

    print("\n1. Built-in Modules")

    print("Square Root:", math.sqrt(25))
    print("Power:", math.pow(2, 3))
    print("Random Number:", random.randint(1, 100))
    print("Current Date:", datetime.date.today())

    print("\n2. Import Specific Functions")

    print("Square Root:", sqrt(64))
    print("Factorial:", factorial(5))
    print("Random Number:", randint(1, 10))

    print("\n3. User-Defined Functions")

    print("Addition:", addition(10, 5))
    print("Subtraction:", subtraction(10, 5))
    print("Multiplication:", multiplication(10, 5))
    print("Division:", division(10, 5))

    print("\n4. Statistics Module")

    numbers = [10, 20, 30, 40, 50]

    print("Mean:", statistics.mean(numbers))
    print("Median:", statistics.median(numbers))

    print("\n5. Module Information")

    print("Module Name:", math.__name__)
    print("Available Functions:", dir(math)[:10])

    print("\nModules Demonstration Completed")


if __name__ == "__main__":
    demonstrate_modules()
