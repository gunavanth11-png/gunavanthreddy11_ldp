
package com.example.designpatterns.factory;

public class ClothingOrder implements Order {

    @Override
    public void process() {
        System.out.println("Processing clothing order.");
        System.out.println("Packing clothes for delivery.");
    }
}
