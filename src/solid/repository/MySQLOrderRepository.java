package solid.repository;

import solid.model.Order;

public class MySQLOrderRepository implements OrderRepository {

    @Override
    public void save(Order order) {
        System.out.println("Order saved successfully");
    }
}