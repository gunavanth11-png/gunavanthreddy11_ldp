
from abc import ABC, abstractmethod

# 1. Class and Object
class Student:

    school = "ABC School"

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def display(self):
        print("Name:", self.name)
        print("Age:", self.age)
        print("School:", Student.school)


student1 = Student("Gunavanth", 22)
student1.display()


# 2. Constructor
class Employee:

    def __init__(self, name):
        self.name = name

employee1 = Employee("Rahul")
print("Employee:", employee1.name)


# 3. Encapsulation
class Account:

    def __init__(self, balance):
        self.__balance = balance

    def get_balance(self):
        return self.__balance

    def set_balance(self, balance):
        if balance >= 0:
            self.__balance = balance


account = Account(5000)
print("Balance:", account.get_balance())

account.set_balance(8000)
print("Updated Balance:", account.get_balance())


# 4. Inheritance
class Animal:

    def sound(self):
        print("Animals make sounds")


class Dog(Animal):

    def bark(self):
        print("Dog barks")


dog = Dog()
dog.sound()
dog.bark()


# 5. Polymorphism
class Cat:

    def sound(self):
        print("Cat meows")


class Cow:

    def sound(self):
        print("Cow moos")


for animal in [Cat(), Cow()]:
    animal.sound()


# 6. Method Overriding
class Parent:

    def show(self):
        print("Parent class")


class Child(Parent):

    def show(self):
        print("Child class")


obj = Child()
obj.show()


# 7. Abstraction
class Shape(ABC):

    @abstractmethod
    def area(self):
        pass


class Circle(Shape):

    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius * self.radius


circle = Circle(5)
print("Circle Area:", circle.area())
