package com.example.factoryassignment.order;

public class FoodOrderFactory implements OrderProcessingFactory {

    @Override
    public String getOrderType() {
        return "Food";
    }

    @Override
    public Order createOrder() {
        return new FoodOrder();
    }
}