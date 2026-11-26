
# 1. Comparison Operators
a = 10
b = 20

print(a == b)
print(a != b)
print(a > b)
print(a < b)
print(a >= b)
print(a <= b)

# 2. Logical Operators
age = 22
marks = 85

print(age >= 18 and marks >= 40)
print(age < 18 or marks >= 40)
print(not(age >= 18))

# 3. Membership Operators
fruits = ["Apple", "Banana", "Mango"]

print("Apple" in fruits)
print("Orange" not in fruits)

# 4. Identity Operators
x = [10, 20, 30]
y = x
z = [10, 20, 30]

print(x is y)
print(x is z)
print(x is not z)

# Difference between == and is
print(x == z)
print(x is z)
