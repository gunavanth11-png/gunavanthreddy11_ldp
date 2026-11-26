
# 1. Basic Function
def greet():
    print("Hello Python")

greet()

# 2. Function with Parameters
def add(a, b):
    print("Addition:", a + b)

add(10, 20)

# 3. Function with Return
def multiply(a, b):
    return a * b

result = multiply(5, 4)
print("Multiplication:", result)

# 4. Positional Arguments
def student(name, age):
    print(name, age)

student("Gunavanth", 22)

# 5. Keyword Arguments
student(age=22, name="Gunavanth")

# 6. Default Arguments
def welcome(name="Student"):
    print("Welcome", name)

welcome()
welcome("Gunavanth")

# 7. Variable-Length Arguments
def total(*numbers):
    print("Total:", sum(numbers))

total(10, 20, 30)

# 8. Keyword Variable Arguments
def details(**data):
    print(data)

details(name="Gunavanth", age=22)

# 9. Lambda Function
square = lambda x: x * x

print("Square:", square(5))

# 10. Recursion
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print("Factorial:", factorial(5))

# 11. Built-in Functions
numbers = [10, 20, 30, 40]

print("Length:", len(numbers))
print("Maximum:", max(numbers))
print("Minimum:", min(numbers))
print("Sum:", sum(numbers))

# 12. String Methods
text = "python"

print(text.upper())
print(text.capitalize())
print(text.replace("python", "java"))

# 13. List Methods
fruits = ["Apple", "Banana"]

fruits.append("Mango")
fruits.remove("Banana")

print(fruits)
