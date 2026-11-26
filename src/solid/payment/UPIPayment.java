package solid.payment;

public class UPIPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println("Payment completed using UPI: ₹" + amount);
    }
}