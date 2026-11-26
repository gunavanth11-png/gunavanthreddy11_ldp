
# 1. If Statement
age = 22

if age >= 18:
    print("Eligible to vote")

# 2. If-Else Statement
marks = 35

if marks >= 40:
    print("Pass")
else:
    print("Fail")

# 3. If-Elif-Else Statement
score = 85

if score >= 90:
    print("A Grade")
elif score >= 75:
    print("B Grade")
elif score >= 60:
    print("C Grade")
else:
    print("Fail")

# 4. For Loop
for i in range(1, 6):
    print(i)

# 5. While Loop
i = 1

while i <= 5:
    print(i)
    i += 1

# 6. Break Statement
for i in range(1, 6):
    if i == 3:
        break
    print(i)

# 7. Continue Statement
for i in range(1, 6):
    if i == 3:
        continue
    print(i)

# 8. Pass Statement
for i in range(3):
    pass

print("Pass example completed")

# 9. Nested Loop
for i in range(1, 3):
    for j in range(1, 3):
        print(i, j)

# 10. Input and Output
name = input("Enter your name: ")
print("Welcome", name)

# 11. Exception Handling
try:
    a = 10
    b = 0
    print(a / b)

except ZeroDivisionError:
    print("Cannot divide by zero")

else:
    print("Division successful")

finally:
    print("Program completed")
