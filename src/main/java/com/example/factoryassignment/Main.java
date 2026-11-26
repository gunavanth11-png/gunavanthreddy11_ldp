package com.example.factoryassignment;

import com.example.factoryassignment.order.OrderProcessingFactory;

import java.util.ServiceLoader;
import java.util.Iterator;

public class Main {

    public static void main(String[] args) {

        System.out.println("===== ONLINE ORDER PROCESSING =====");

        ServiceLoader<OrderProcessingFactory> factories =
                ServiceLoader.load(OrderProcessingFactory.class);

        Iterator<OrderProcessingFactory> iterator = factories.iterator();

        if (!iterator.hasNext()) {
            System.out.println("No factories found!");
            System.out.println("Please check the META-INF/services registration file.");
            return;
        }

        for (OrderProcessingFactory factory : factories) {
            System.out.println("\nOrder Type: " + factory.getOrderType());
            factory.processOrder();
        }
    }
}