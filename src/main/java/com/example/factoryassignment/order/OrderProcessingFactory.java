package com.example.factoryassignment.order;

public interface OrderProcessingFactory {

    String getOrderType();

    Order createOrder();

    default void processOrder() {
        Order order = createOrder();
        order.processOrder();
    }
}