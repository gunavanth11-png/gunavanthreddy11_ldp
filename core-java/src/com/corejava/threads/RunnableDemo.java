package com.corejava.threads;

class MyRunnableTask implements Runnable {

    @Override
    public void run() {
        System.out.println(
                "Runnable task is running"
        );
    }
}

public class RunnableDemo {

    public static void main(String[] args) {

        MyRunnableTask task =
                new MyRunnableTask();

        Thread thread =
                new Thread(task);

        thread.start();
    }
}