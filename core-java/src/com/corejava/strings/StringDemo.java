package com.corejava.strings;

public class StringDemo {

    public static void main(String[] args) {

        String name = "Gunavanth";

        System.out.println("Name: " + name);

        System.out.println("Length: " + name.length());

        System.out.println("Uppercase: " + name.toUpperCase());

        System.out.println("Lowercase: " + name.toLowerCase());

        System.out.println("First character: " + name.charAt(0));

        System.out.println(
                "Contains van: " + name.contains("van")
        );

        System.out.println(
                "Starts with Gun: " + name.startsWith("Gun")
        );
    }
}