package com.example.factoryassignment.order;

public class FoodOrder implements Order {

    @Override
    public void processOrder() {
        System.out.println("Processing food order...");
        System.out.println("Food order confirmed!");
    }
}