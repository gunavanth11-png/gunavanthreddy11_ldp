//String and Type Information
//Using the documentation for java.util.regex.Pattern as a resource,
// write and test a regular expression that checks a sentence to see that it begins with a capital letter and ends with a period

package com.corejava.assignment9;

import java.util.Scanner;
import java.util.regex.Pattern;

public class StringAndTypeInformation {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a sentence: ");
        String sentence = sc.nextLine();

        String regex = "^[A-Z].*\\.$";

        if (Pattern.matches(regex, sentence))
            System.out.println("Valid sentence");
        else
            System.out.println("Invalid sentence");
    }
}