package solid.model;

public class Burger extends Food {

    @Override
    public void prepare() {
        System.out.println("Burger is being prepared");
    }
}