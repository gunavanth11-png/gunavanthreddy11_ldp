package solid;

import solid.model.Order;
import solid.model.Food;
import solid.model.Pizza;
import solid.model.Burger;

import solid.notification.Notification;
import solid.notification.SMSNotification;

import solid.payment.Payment;
import solid.payment.UPIPayment;

import solid.repository.MySQLOrderRepository;
import solid.repository.OrderRepository;

import solid.service.DeliveryService;
import solid.service.FoodService;
import solid.service.OrderService;
import solid.service.PriceCalculator;

public class Main {

    private static final String CUSTOMER_NAME = "Gunavanth";
    private static final String FOOD_NAME = "Biryani";
    private static final double FOOD_PRICE = 250.0;

    public static void main(String[] args) {

        Order order = new Order(
                CUSTOMER_NAME,
                FOOD_NAME,
                FOOD_PRICE
        );

        OrderRepository orderRepository =
                new MySQLOrderRepository();

        Payment payment =
                new UPIPayment();

        Notification notification =
                new SMSNotification();

        PriceCalculator priceCalculator =
                new PriceCalculator();

        DeliveryService deliveryService =
                new DeliveryService();

        OrderService orderService =
                new OrderService(
                        payment,
                        notification,
                        orderRepository,
                        priceCalculator,
                        deliveryService
                );

        orderService.placeOrder(order);

        FoodService foodService =
                new FoodService();

        Food pizza =
                new Pizza();

        foodService.prepareFood(pizza);

        Food burger =
                new Burger();

        foodService.prepareFood(burger);
    }
}