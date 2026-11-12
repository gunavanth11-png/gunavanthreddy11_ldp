
package com.example.designpatterns.factory;

public class FoodOrderProcessor extends OrderProcessor {

    @Override
    public Order createOrder() {
        return new FoodOrder();
    }
}
