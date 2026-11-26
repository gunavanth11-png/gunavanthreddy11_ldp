
# 1. Variables
name = "Gunavanth"
age = 22
marks = 85.5

print("Name:", name)
print("Age:", age)
print("Marks:", marks)

# 2. Data Types
a = 10
b = 10.5
c = "Python"
d = True
e = 2 + 3j

print(type(a))
print(type(b))
print(type(c))
print(type(d))
print(type(e))

# 3. Type Conversion
x = "100"
print(int(x))
print(float(x))
print(str(200))

# 4. Strings
language = "Python Programming"

print(language.upper())
print(language.lower())
print(language.replace("Python", "Java"))
print(len(language))
print(language[0])
print(language[0:6])

# 5. Lists (Ordered and Mutable)
fruits = ["Apple", "Banana", "Mango"]

fruits.append("Orange")
fruits.insert(1, "Grapes")
fruits.remove("Banana")

print("List:", fruits)
print("First fruit:", fruits[0])

# 6. Tuples (Ordered and Immutable)
numbers = (10, 20, 30, 40)

print("Tuple:", numbers)
print("First element:", numbers[0])
print("Length:", len(numbers))

# 7. Sets (Unique Elements)
unique_numbers = {10, 20, 30, 10, 20}

unique_numbers.add(40)

print("Set:", unique_numbers)

# Set Operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}

print("Union:", set1.union(set2))
print("Intersection:", set1.intersection(set2))
print("Difference:", set1.difference(set2))

# 8. Dictionaries (Key-Value Pairs)
student = {
    "name": "Gunavanth",
    "age": 22,
    "marks": 85
}

print(student["name"])

student["city"] = "Hyderabad"
student["marks"] = 90

print("Dictionary:", student)
print("Keys:", student.keys())
print("Values:", student.values())
print("Items:", student.items())

# 9. Indexing and Slicing
values = [10, 20, 30, 40, 50]

print(values[0])
print(values[-1])
print(values[1:4])
print(values[:3])
print(values[2:])

# 10. Mutable and Immutable
my_list = [10, 20, 30]
my_list[0] = 100
print("Mutable List:", my_list)

my_string = "Python"
# Strings are immutable
print("Immutable String:", my_string)
