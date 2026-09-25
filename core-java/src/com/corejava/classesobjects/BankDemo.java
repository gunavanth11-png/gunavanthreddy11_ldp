package com.corejava.classesobjects;

public class BankDemo {

    public static void main(String[] args) {

        BankAccount account = new BankAccount(1000);

        account.deposit(500);

        System.out.println(
                "Balance: " + account.getBalance()
        );
    }
}