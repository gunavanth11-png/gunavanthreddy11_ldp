package solid.service;

import solid.model.Order;

public class PriceCalculator {

    private static final double DELIVERY_CHARGE = 40;

    public double calculateTotal(Order order) {
        return order.getPrice() + DELIVERY_CHARGE;
    }
}