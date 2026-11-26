//Operators and More:
//1. A vampire number v is a number with an even number of digits n, that can be factored into two numbers x and y each with n/2 digits and not both with trailing zeroes,
// where v contains precisely all the digits from x and from y, in any order. Write a java program to print first 100 vampire numbers.
//2. Create a class with two (overloaded) constructors. Using this, call the second constructor inside the first one.
//3. Create a class with a constructor that takes a String argument. During construction, print the argument.
// Create an array of object references to this class, but don’t actually create objects to assign into the array. When you run the program, notice whether the initialization messages from the constructor calls are printed.
// 4. Complete the previous exercise by creating objects to attach to the array of references.

package com.corejava.assignment5;

import java.util.Arrays;

public class OperatorsAndMore {

    static class ConstructorDemo {

        ConstructorDemo() {
            this("Second constructor");
        }

        ConstructorDemo(String text) {
            System.out.println(text);
        }
    }

    static class Message {

        Message(String text) {
            System.out.println(text);
        }
    }

    static boolean isVampire(int n) {

        String number = String.valueOf(n);

        if (number.length() % 2 != 0) {
            return false;
        }

        int half = number.length() / 2;
        int min = (int) Math.pow(10, half - 1);
        int max = (int) Math.pow(10, half);

        for (int x = min; x < max; x++) {

            if (n % x == 0) {

                int y = n / x;

                if (y >= min && y < max &&
                        !(x % 10 == 0 && y % 10 == 0)) {

                    char[] original = number.toCharArray();
                    char[] factors = ("" + x + y).toCharArray();

                    Arrays.sort(original);
                    Arrays.sort(factors);

                    if (Arrays.equals(original, factors)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    public static void main(String[] args) {

        System.out.println("First 100 Vampire Numbers:");

        int count = 0;
        int number = 10;

        while (count < 100) {

            if (isVampire(number)) {
                System.out.println(number);
                count++;
            }

            number++;
        }

        System.out.println("\nConstructor Overloading:");
        new ConstructorDemo();

        System.out.println("\nArray Without Objects:");
        Message[] messages = new Message[3];
        System.out.println(Arrays.toString(messages));

        System.out.println("\nArray With Objects:");
        messages[0] = new Message("Object 1 created");
        messages[1] = new Message("Object 2 created");
        messages[2] = new Message("Object 3 created");
    }
}