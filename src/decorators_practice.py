print("========== PYTHON DECORATORS ==========")


def simple_decorator(func):
    def wrapper():
        print("Function execution started")
        func()
        print("Function execution completed")
    return wrapper


@simple_decorator
def greet():
    print("Hello, welcome to Python!")


greet()


def logging_decorator(func):
    def wrapper():
        print("Executing function:", func.__name__)
        func()
    return wrapper


@logging_decorator
def display_message():
    print("Learning Python decorators")


display_message()


def uppercase_decorator(func):
    def wrapper():
        result = func()
        return result.upper()
    return wrapper


@uppercase_decorator
def get_name():
    return "python programming"


print("Uppercase:", get_name())


def calculation_decorator(func):
    def wrapper(a, b):
        print("Calculating result...")
        result = func(a, b)
        print("Result:", result)
        return result
    return wrapper


@calculation_decorator
def add(a, b):
    return a + b


add(10, 20)


def repeat_decorator(func):
    def wrapper():
        for i in range(3):
            func()
    return wrapper


@repeat_decorator
def say_hello():
    print("Hello!")


say_hello()


print("========== END OF DECORATORS ==========")