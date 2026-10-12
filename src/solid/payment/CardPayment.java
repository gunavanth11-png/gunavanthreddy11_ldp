package solid.payment;

public class CardPayment implements Payment {

    @Override
    public void pay(double amount) {
        System.out.println("Payment completed using Card: " + amount);
    }
}