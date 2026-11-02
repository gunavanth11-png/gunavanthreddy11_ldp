
package com.example.calculator;

import java.util.Scanner;

public class CalculatorApp {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("===== CALCULATOR APPLICATION =====");
        System.out.println("1. Basic Calculator");
        System.out.println("2. Scientific Calculator");
        System.out.println("3. Programmer Calculator");
        System.out.print("Select calculator mode: ");

        int choice = scanner.nextInt();

        try {
            Calculator calculator =
                    CalculatorFactory.createCalculator(choice);

            calculator.calculate(scanner);

        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }

        scanner.close();
    }
}
