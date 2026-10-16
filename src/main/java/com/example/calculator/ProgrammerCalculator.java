
package com.example.calculator;

import java.util.Scanner;

public class ProgrammerCalculator implements Calculator {

    @Override
    public void calculate(Scanner scanner) {
        System.out.println("1. Bitwise AND");
        System.out.println("2. Bitwise OR");
        System.out.println("3. Bitwise XOR");
        System.out.println("4. Convert decimal to binary");
        System.out.print("Choose operation: ");

        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
            case 2:
            case 3:
                System.out.print("Enter first integer: ");
                int a = scanner.nextInt();

                System.out.print("Enter second integer: ");
                int b = scanner.nextInt();

                if (choice == 1) {
                    System.out.println("Result: " + (a & b));
                } else if (choice == 2) {
                    System.out.println("Result: " + (a | b));
                } else {
                    System.out.println("Result: " + (a ^ b));
                }
                break;

            case 4:
                System.out.print("Enter decimal integer: ");
                int number = scanner.nextInt();

                System.out.println(
                        "Binary: " + Integer.toBinaryString(number)
                );
                break;

            default:
                System.out.println("Invalid choice.");
        }
    }
}
