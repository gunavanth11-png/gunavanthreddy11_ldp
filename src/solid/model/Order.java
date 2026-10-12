package solid.model;

public class Order {

    private String customerName;
    private String foodName;
    private double price;

    public Order(String customerName, String foodName, double price) {
        this.customerName = customerName;
        this.foodName = foodName;
        this.price = price;
    }

    public String getCustomerName() {
        return customerName;
    }

    public String getFoodName() {
        return foodName;
    }

    public double getPrice() {
        return price;
    }
}