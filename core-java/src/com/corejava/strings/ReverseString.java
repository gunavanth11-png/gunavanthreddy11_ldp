package com.corejava.strings;

public class ReverseString {

    public static void main(String[] args) {

        String text = "Java";

        String reversed = "";

        for (int i = text.length() - 1; i >= 0; i--) {

            reversed = reversed + text.charAt(i);
        }

        System.out.println("Original: " + text);
        System.out.println("Reversed: " + reversed);
    }
}