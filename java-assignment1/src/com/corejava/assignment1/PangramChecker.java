//Write a java function that checks if the input string contains all the letters of the alphabet a-z (case-insensitive).
// Write time and space complexity of your solution as comments in the source file.

package com.corejava.assignment1;

public class PangramChecker {

    public static boolean isPangram(String input) {
        boolean[] seen = new boolean[26];
        String lower = input.toLowerCase();

        for (int i = 0; i < lower.length(); i++) {
            char c = lower.charAt(i);
            if (c >= 'a' && c <= 'z') {
                seen[c - 'a'] = true;
            }
        }

        for (boolean letterSeen : seen) {
            if (!letterSeen) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {
        String test1 = "The quick brown fox jumps over the lazy dog";
        String test2 = "Hello World";

        System.out.println("\"" + test1 + "\" is pangram? " + isPangram(test1));
        System.out.println("\"" + test2 + "\" is pangram? " + isPangram(test2));
    }
}