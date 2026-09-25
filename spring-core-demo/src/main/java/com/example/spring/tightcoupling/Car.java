package com.example.spring.tightcoupling;

public class Car {

    private Engine engine = new Engine();

    public void drive() {
        engine.start();
        System.out.println("Car is driving");
    }
}