//Error Handling
// Create three new types of exceptions. Write a class with a method that throws all three. In main( ), call the method but only use a single catch clause that will catch all three types of exceptions.
// Add a finally clause and verify that your finally clause is executed, even if a NullPointerException is thrown.
package com.corejava.assignment5;

public class ErrorHandling {

    static class Error1 extends Exception {}
    static class Error2 extends Exception {}
    static class Error3 extends Exception {}

    static void test(int n) throws Error1, Error2, Error3 {
        if (n == 1) throw new Error1();
        if (n == 2) throw new Error2();
        if (n == 3) throw new Error3();
    }

    public static void main(String[] args) {

        try {
            test(1);
            String s = null;
            System.out.println(s.length());
        } catch (Exception e) {
            System.out.println("Exception caught");
        } finally {
            System.out.println("Finally executed");
        }
    }
}