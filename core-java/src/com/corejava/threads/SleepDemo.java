package com.corejava.threads;

public class SleepDemo {

    public static void main(String[] args) {

        Thread thread = new Thread(() -> {

            for (int i = 1; i <= 5; i++) {

                System.out.println(
                        "Count: " + i
                );

                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });

        thread.start();
    }
}