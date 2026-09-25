package com.corejava.regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexDemo {

    public static void main(String[] args) {

        String text = "My phone number is 9876543210";

        String regex = "\\d{10}";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            System.out.println("Phone number found");
            System.out.println("Number: " + matcher.group());
        } else {
            System.out.println("Phone number not found");
        }
    }
}