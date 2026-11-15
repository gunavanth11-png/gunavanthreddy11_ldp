
package com.example.designpatterns.factory;

public class FoodOrder implements Order {

    @Override
    public void process() {
        System.out.println("Processing food order.");
        System.out.println("Preparing food for delivery.");
    }
}
