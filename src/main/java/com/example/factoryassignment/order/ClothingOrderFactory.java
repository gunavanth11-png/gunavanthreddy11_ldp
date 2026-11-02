package com.example.factoryassignment.order;

public class ClothingOrderFactory implements OrderProcessingFactory {

    @Override
    public String getOrderType() {
        return "Clothing";
    }

    @Override
    public Order createOrder() {
        return new ClothingOrder();
    }
}