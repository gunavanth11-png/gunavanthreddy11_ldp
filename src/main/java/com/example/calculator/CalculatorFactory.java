
package com.example.calculator;

public class CalculatorFactory {

    public static Calculator createCalculator(int choice) {
        switch (choice) {
            case 1:
                return new BasicCalculator();

            case 2:
                return new ScientificCalculator();

            case 3:
                return new ProgrammerCalculator();

            default:
                throw new IllegalArgumentException(
                        "Invalid calculator mode."
                );
        }
    }
}
