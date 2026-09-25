package com.corejava.threads;

class BasicThread extends Thread {

    @Override
    public void run() {
        System.out.println("Child thread is running");
    }
}

public class ThreadBasics {

    public static void main(String[] args) {

        BasicThread thread = new BasicThread();

        thread.start();

        System.out.println("Main thread is running");
    }
}