package solid.model;

public class Pizza extends Food {

    @Override
    public void prepare() {
        System.out.println("Pizza is being prepared");
    }
}