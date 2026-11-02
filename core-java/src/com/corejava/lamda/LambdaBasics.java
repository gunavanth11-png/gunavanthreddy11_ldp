package com.corejava.lambda;

@FunctionalInterface
interface Greeting {

    void sayHello();
}

public class LambdaBasics {

    public static void main(String[] args) {

        Greeting greeting =
                () -> System.out.println("Hello Gunavanth");

        greeting.sayHello();
    }
}