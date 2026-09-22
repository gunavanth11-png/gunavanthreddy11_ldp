//Create a java program to search through the home directory and look for files that match a regular expression.
// The program should be able to take inputs repeatedly and should print out the full absolute path of the matching files found.

package com.corejava.assignment1;
import java.io.File;
import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class FileSearcher {

    public static void main(String[] args) {
        String homeDirPath = System.getProperty("user.home");
        File homeDir = new File(homeDirPath);

        Scanner scanner = new Scanner(System.in);

        System.out.println("Home directory: " + homeDir.getAbsolutePath());
        System.out.println("Enter a regular expression to search for matching file names.");
        System.out.println("Type 'exit' to quit the program.\n");

        while (true) {
            System.out.print("Enter regex (or 'exit'): ");
            String input = scanner.nextLine().trim();

            if (input.equalsIgnoreCase("exit")) {
                System.out.println("Goodbye!");
                break;
            }

            if (input.isEmpty()) {
                System.out.println("Please enter a valid regex.\n");
                continue;
            }

            Pattern pattern;
            try {
                pattern = Pattern.compile(input);
            } catch (PatternSyntaxException e) {
                System.out.println("Invalid regular expression: " + e.getMessage() + "\n");
                continue;
            }

            List<File> results = new ArrayList<>();

            searchDirectory(homeDir, pattern, results);

            if (results.isEmpty()) {
                System.out.println("No matching files found.\n");
            } else {
                System.out.println("Found " + results.size() + " matching file(s):");
                for (File f : results) {
                    System.out.println(f.getAbsolutePath());
                }
                System.out.println();
            }
        }

        scanner.close();
    }

    private static void searchDirectory(File dir, Pattern pattern, List<File> results) {
        File[] files = dir.listFiles();

        if (files == null) {
            return;
        }

        for (File file : files) {
            if (file.isDirectory()) {
                searchDirectory(file, pattern, results);
            } else {
                if (pattern.matcher(file.getName()).matches()) {
                    results.add(file);
                }
            }
        }
    }
}