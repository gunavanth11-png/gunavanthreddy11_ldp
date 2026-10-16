
package com.example.calculator;

import java.util.Scanner;

public class ScientificCalculator implements Calculator {

    @Override
    public void calculate(Scanner scanner) {
        System.out.println("1. Square root");
        System.out.println("2. Power");
        System.out.println("3. Sine");
        System.out.println("4. Cosine");
        System.out.print("Choose operation: ");

        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                System.out.print("Enter number: ");
                double number = scanner.nextDouble();

                if (number < 0) {
                    System.out.println(
                            "Square root of a negative number is not supported."
                    );
                } else {
                    System.out.println(
                            "Result: " + Math.sqrt(number)
                    );
                }
                break;

            case 2:
                System.out.print("Enter base: ");
                double base = scanner.nextDouble();

                System.out.print("Enter exponent: ");
                double exponent = scanner.nextDouble();

                System.out.println(
                        "Result: " + Math.pow(base, exponent)
                );
                break;

            case 3:
                System.out.print("Enter angle in degrees: ");
                double angle1 = scanner.nextDouble();

                System.out.println(
                        "Result: " + Math.sin(Math.toRadians(angle1))
                );
                break;

            case 4:
                System.out.print("Enter angle in degrees: ");
                double angle2 = scanner.nextDouble();

                System.out.println(
                        "Result: " + Math.cos(Math.toRadians(angle2))
                );
                break;

            default:
                System.out.println("Invalid choice.");
        }
    }
}
