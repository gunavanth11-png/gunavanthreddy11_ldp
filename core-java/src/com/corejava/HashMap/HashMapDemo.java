package com.corejava.datastructures;

import java.util.HashMap;

public class HashMapDemo {

    public static void main(String[] args) {

        HashMap<Integer, String> students = new HashMap<>();

        students.put(101, "Rahul");
        students.put(102, "Ravi");
        students.put(103, "Anil");

        System.out.println(students);

        System.out.println(students.get(102));

        students.remove(103);

        System.out.println(students);
    }
}