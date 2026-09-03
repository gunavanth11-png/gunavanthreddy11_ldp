package com.corejava.threads;

class TaskThread extends Thread {

    private String taskName;

    public TaskThread(String taskName) {
        this.taskName = taskName;
    }

    @Override
    public void run() {

        for (int i = 1; i <= 5; i++) {
            System.out.println(
                    taskName + " : " + i
            );
        }
    }
}

public class MultipleThreads {

    public static void main(String[] args) {

        TaskThread task1 =
                new TaskThread("Task 1");

        TaskThread task2 =
                new TaskThread("Task 2");

        task1.start();
        task2.start();
    }
}