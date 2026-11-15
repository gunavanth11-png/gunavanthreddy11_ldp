
package com.example.designpatterns.factory;

public class ClothingOrderProcessor extends OrderProcessor {

    @Override
    public Order createOrder() {
        return new ClothingOrder();
    }
}
