package com.example.factoryassignment.order;

public class ClothingOrder implements Order {

    @Override
    public void processOrder() {
        System.out.println("Processing clothing order...");
        System.out.println("Clothing order confirmed!");
    }
}