package com.corejava.regex;

import java.util.regex.Pattern;

public class PhoneValidator {

    public static void main(String[] args) {

        String phone = "9876543210";

        String regex = "^[0-9]{10}$";

        boolean valid =
                Pattern.matches(regex, phone);

        if (valid) {
            System.out.println("Valid phone number");
        } else {
            System.out.println("Invalid phone number");
        }
    }
}