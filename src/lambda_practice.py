print("========== LAMBDA FUNCTIONS ==========")

add = lambda a, b: a + b
print("Addition:", add(10, 20))

square = lambda number: number * number
print("Square:", square(5))

check_even_odd = lambda number: "Even" if number % 2 == 0 else "Odd"
print("Even or Odd:", check_even_odd(7))

largest = lambda a, b: a if a > b else b
print("Largest number:", largest(10, 25))

numbers = [1, 2, 3, 4, 5]

doubled = list(map(lambda number: number * 2, numbers))
print("Doubled numbers:", doubled)

values = [10, 15, 20, 25, 30, 35, 40]

even_numbers = list(filter(lambda number: number % 2 == 0, values))
print("Even numbers:", even_numbers)

numbers_list = [50, 10, 40, 20, 30]

sorted_numbers = sorted(numbers_list, key=lambda number: number)
print("Sorted numbers:", sorted_numbers)

names = ["Rahul", "Amit", "Gunavanth", "Sneha", "Priya"]

sorted_names = sorted(names, key=lambda name: len(name))
print("Names sorted by length:", sorted_names)

print("========== END OF LAMBDA PRACTICE ==========")