
package com.example.calculator;

import java.util.Scanner;

public class BasicCalculator implements Calculator {

    @Override
    public void calculate(Scanner scanner) {
        System.out.print("Enter first number: ");
        double a = scanner.nextDouble();

        System.out.print("Enter operator (+, -, *, /): ");
        String operator = scanner.next();

        System.out.print("Enter second number: ");
        double b = scanner.nextDouble();

        switch (operator) {
            case "+":
                System.out.println("Result: " + (a + b));
                break;
            case "-":
                System.out.println("Result: " + (a - b));
                break;
            case "*":
                System.out.println("Result: " + (a * b));
                break;
            case "/":
                if (b == 0) {
                    System.out.println("Cannot divide by zero.");
                } else {
                    System.out.println("Result: " + (a / b));
                }
                break;
            default:
                System.out.println("Invalid operator.");
        }
    }
}
