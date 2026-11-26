package com.corejava.exceptions;

public class ExceptionDemo {

    public static void main(String[] args) {

        try {
            int result = 10 / 0;
            System.out.println(result);
        } catch (ArithmeticException exception) {
            System.out.println("Cannot divide by zero");
        }

        System.out.println("Program continues");
    }
}