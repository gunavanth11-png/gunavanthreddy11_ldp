package com.corejava.arrays;

public class ArraySum {

    public static void main(String[] args) {

        int[] numbers = {10, 20, 30, 40, 50};

        int sum = 0;

        for (int number : numbers) {

            sum = sum + number;
        }

        System.out.println("Sum: " + sum);
    }
}