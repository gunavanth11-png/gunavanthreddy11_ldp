//I/O
//Using TextFile and a Map<Character,Integer>, create a program that takes the file name as a command line argument and counts the occurrence of all the different characters.
// Save the results in a text file.

package com.corejava.assignment9;

import java.io.*;
import java.util.*;

public class IOCharacterCount {

    public static void main(String[] args) throws Exception {

        if (args.length == 0) {
            System.out.println("Enter a file name");
            return;
        }

        Map<Character, Integer> map = new TreeMap<>();

        BufferedReader reader = new BufferedReader(new FileReader(args[0]));
        int ch;

        while ((ch = reader.read()) != -1) {
            char c = (char) ch;
            map.put(c, map.getOrDefault(c, 0) + 1);
        }

        reader.close();

        PrintWriter writer = new PrintWriter("output.txt");

        for (Map.Entry<Character, Integer> entry : map.entrySet())
            writer.println(entry.getKey() + " = " + entry.getValue());

        writer.close();

        System.out.println("Character count saved to output.txt");
    }
}