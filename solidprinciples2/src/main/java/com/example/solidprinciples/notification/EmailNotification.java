package com.example.solidprinciples.notification;

public class EmailNotification implements Notification {

    @Override
    public void sendNotification(String recipient, String message) {
        System.out.println("Sending Email Notification");
        System.out.println("To      : " + recipient);
        System.out.println("Message : " + message);
        System.out.println("------------------------------");
    }
}