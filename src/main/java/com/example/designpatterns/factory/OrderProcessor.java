
package com.example.designpatterns.factory;

public abstract class OrderProcessor {

    public abstract Order createOrder();

    public void processOrder() {
        Order order = createOrder();
        order.process();
    }
}
