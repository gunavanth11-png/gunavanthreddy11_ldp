//Access Control and More
//1. Create an inheritance hierarchy of Rodent: Mouse, Gerbil, Hamster,etc. In the base class, provide methods that are common to all Rodents, and override these in the derived classes to perform different behaviors depending on the specific type of Rodent. Create an array of Rodent, fill it with different specific types of Rodents, and call your base-class methods to see what happens. Make the methods of Rodent abstract whenever possible and all classes should have default constructors that print a message about that class.
// 2. Create a Cycle class, with subclasses Unicycle, Bicycle and Tricycle. Add a balance( ) method to Unicycle and Bicycle, but not to Tricycle. Create instances of all three types and upcast them to an array of Cycle. Try to call balance( ) on each element of the array and observe the results. Downcast and call balance( ) and observe what happens.
//3. Create three interfaces, each with two methods. Inherit a new interface that combines the three, adding a new method. Create a class by implementing the new interface and also inheriting from a concrete class. Now write four methods, each of which takes one of the four interfaces as an argument. In main( ), create an object of your class and pass it to each of the methods.
// 4. Create a Cycle interface, with implementations Unicycle, Bicycle and Tricycle. Create factories for each type of Cycle, and code that uses these factories.
// 5. Create a class with an inner class that has a non-default constructor (one that takes arguments). Create a second class with an inner class that inherits from the first inner class.

package com.corejava.assignment5;

public class AccessControlAndMore {

    static abstract class Rodent {                                 //1
        Rodent() {
            System.out.println("Rodent created");
        }

        abstract void eat();
        abstract void sound();
    }

    static class Mouse extends Rodent {
        Mouse() {
            System.out.println("Mouse created");
        }

        void eat() {
            System.out.println("Mouse eats");
        }

        void sound() {
            System.out.println("Mouse squeaks");
        }
    }

    static class Gerbil extends Rodent {
        Gerbil() {
            System.out.println("Gerbil created");
        }

        void eat() {
            System.out.println("Gerbil eats");
        }

        void sound() {
            System.out.println("Gerbil squeaks");
        }
    }

    static class Hamster extends Rodent {
        Hamster() {
            System.out.println("Hamster created");
        }

        void eat() {
            System.out.println("Hamster eats");
        }

        void sound() {
            System.out.println("Hamster squeaks");
        }
    }

    static class Cycle {                    //2
        void ride() {
            System.out.println("Cycle rides");
        }
    }

    static class Unicycle extends Cycle {
        void balance() {
            System.out.println("Unicycle balances");
        }
    }

    static class Bicycle extends Cycle {
        void balance() {
            System.out.println("Bicycle balances");
        }
    }

    static class Tricycle extends Cycle {                 //3
    }

    interface One {
        void one();
        void two();
    }

    interface Two {
        void three();
        void four();
    }

    interface Three {
        void five();
        void six();
    }

    interface Combined extends One, Two, Three {
        void seven();
    }

    static class Parent {
    }

    static class Child extends Parent implements Combined {
        public void one() {
            System.out.println("One");
        }

        public void two() {
            System.out.println("Two");
        }

        public void three() {
            System.out.println("Three");
        }

        public void four() {
            System.out.println("Four");
        }

        public void five() {
            System.out.println("Five");
        }

        public void six() {
            System.out.println("Six");
        }

        public void seven() {
            System.out.println("Seven");
        }
    }

    static void useOne(One obj) {
        obj.one();
    }

    static void useTwo(Two obj) {
        obj.three();
    }

    static void useThree(Three obj) {
        obj.five();
    }

    static void useCombined(Combined obj) {
        obj.seven();
    }

    interface CycleFactory {           //4
        Cycle create();
    }

    static class UnicycleFactory implements CycleFactory {
        public Cycle create() {
            return new Unicycle();
        }
    }

    static class BicycleFactory implements CycleFactory {
        public Cycle create() {
            return new Bicycle();
        }
    }

    static class TricycleFactory implements CycleFactory {
        public Cycle create() {
            return new Tricycle();
        }
    }

    static class Outer {            //5
        class Inner {
            Inner(String name) {
                System.out.println("Inner: " + name);
            }
        }
    }

    static class SecondOuter extends Outer {
        class SecondInner extends Inner {
            SecondInner(String name) {
                super(name);
                System.out.println("Second Inner");
            }
        }
    }

    public static void main(String[] args) {

        System.out.println("1. Rodents");

        Rodent[] rodents = {
                new Mouse(),
                new Gerbil(),
                new Hamster()
        };

        for (Rodent r : rodents) {
            r.eat();
            r.sound();
        }

        System.out.println("\n2. Cycles");

        Cycle[] cycles = {
                new Unicycle(),
                new Bicycle(),
                new Tricycle()
        };

        for (Cycle c : cycles) {
            c.ride();
        }

        ((Unicycle) cycles[0]).balance();
        ((Bicycle) cycles[1]).balance();

        System.out.println("\n3. Interfaces");

        Child child = new Child();

        useOne(child);
        useTwo(child);
        useThree(child);
        useCombined(child);

        System.out.println("\n4. Factories");

        CycleFactory f1 = new UnicycleFactory();
        CycleFactory f2 = new BicycleFactory();
        CycleFactory f3 = new TricycleFactory();

        f1.create().ride();
        f2.create().ride();
        f3.create().ride();

        System.out.println("\n5. Inner Classes");

        SecondOuter outer = new SecondOuter();
        outer.new SecondInner("Hello");
    }
}