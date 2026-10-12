package solid.service;

import solid.model.Order;

public class DeliveryService {

    public void assignDelivery(Order order) {
        System.out.println("Delivery assigned for " + order.getFoodName());
    }
}