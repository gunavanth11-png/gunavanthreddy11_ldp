package com.corejava.datastructures;

import java.util.Stack;

public class StackDemo {

    public static void main(String[] args) {

        Stack<String> stack = new Stack<>();

        stack.push("Java");
        stack.push("Python");
        stack.push("React");

        System.out.println(stack);

        System.out.println(
                "Top: " + stack.peek()
        );

        stack.pop();

        System.out.println(stack);
    }
}