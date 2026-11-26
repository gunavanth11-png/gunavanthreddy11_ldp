print("========== PYTHON GENERATORS ==========")


def number_generator():
    yield 1
    yield 2
    yield 3
    yield 4
    yield 5


for number in number_generator():
    print("Generated number:", number)


def even_generator():
    for number in range(2, 21, 2):
        yield number


print("Even numbers:", list(even_generator()))


def square_generator():
    for number in range(1, 6):
        yield number ** 2


print("Squares:", list(square_generator()))


def multiplication_generator(number):
    for i in range(1, 11):
        yield number * i


print("Multiplication table:", list(multiplication_generator(5)))


def countdown_generator(number):
    while number > 0:
        yield number
        number -= 1


print("Countdown:", list(countdown_generator(5)))


def fruits_generator():
    fruits = ["Apple", "Banana", "Mango", "Orange"]

    for fruit in fruits:
        yield fruit


fruits = fruits_generator()

print("First fruit:", next(fruits))
print("Second fruit:", next(fruits))
print("Third fruit:", next(fruits))
print("Fourth fruit:", next(fruits))


def range_generator(start, end):
    for number in range(start, end + 1):
        yield number


print("Range values:", list(range_generator(1, 10)))


print("========== END OF GENERATORS ==========")