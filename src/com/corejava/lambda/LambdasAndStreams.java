package com.corejava.lambda;

import java.util.Arrays;
import java.util.List;

public class LambdasAndStreams {

    public static void main(String[] args) {

        List<String> names = Arrays.asList(
                "Rahul", "Amit", "Priya", "Anu", "Ravi"
        );

        System.out.println("All Names:");
        names.forEach(name -> System.out.println(name));

        System.out.println("\nNames starting with A:");
        names.stream()
                .filter(name -> name.startsWith("A"))
                .forEach(System.out::println);

        System.out.println("\nUppercase Names:");
        names.stream()
                .map(String::toUpperCase)
                .forEach(System.out::println);

        System.out.println("\nNames with more than 4 letters:");
        names.stream()
                .filter(name -> name.length() > 4)
                .forEach(System.out::println);
    }
}