package solid.service;

import solid.model.Order;
import solid.notification.Notification;
import solid.payment.Payment;
import solid.repository.OrderRepository;

public class OrderService {

    private Payment payment;
    private Notification notification;
    private OrderRepository orderRepository;
    private PriceCalculator priceCalculator;
    private DeliveryService deliveryService;

    public OrderService(
            Payment payment,
            Notification notification,
            OrderRepository orderRepository,
            PriceCalculator priceCalculator,
            DeliveryService deliveryService) {

        this.payment = payment;
        this.notification = notification;
        this.orderRepository = orderRepository;
        this.priceCalculator = priceCalculator;
        this.deliveryService = deliveryService;
    }

    public void placeOrder(Order order) {

        double total = priceCalculator.calculateTotal(order);

        payment.pay(total);

        orderRepository.save(order);

        notification.send("Order placed successfully");

        deliveryService.assignDelivery(order);
    }
}