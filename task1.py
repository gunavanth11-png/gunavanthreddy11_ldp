numbers = [4, 1, 2, 1, 2]

unique = 0

for number in numbers:
    unique = unique ^ number

print(unique)