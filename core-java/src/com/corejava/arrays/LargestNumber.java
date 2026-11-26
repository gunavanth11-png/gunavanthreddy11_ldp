package com.corejava.arrays;

public class LargestNumber {

    public static void main(String[] args) {

        int[] numbers = {20, 50, 10, 80, 30};

        int largest = numbers[0];

        for (int number : numbers) {

            if (number > largest) {

                largest = number;
            }
        }

        System.out.println("Largest: " + largest);
    }
}