package com.corejava.datastructures;

import java.util.HashSet;

public class HashSetDemo {

    public static void main(String[] args) {

        HashSet<String> languages = new HashSet<>();

        languages.add("Java");
        languages.add("Python");
        languages.add("Java");
        languages.add("React");

        System.out.println(languages);

        System.out.println(languages.contains("Java"));

        languages.remove("Python");

        System.out.println(languages);
    }
}