package solid.repository;

import solid.model.Order;

public interface OrderRepository {

    void save(Order order);
}