public class Main {

    public static void main(String[] args) {

        System.out.println("PERSON BUILDER");

        Person person = new PersonBuilder()
                .firstName("Gunavanth")
                .lastName("Reddy")
                .age(23)
                .address("Madhapur")
                .city("Hyderabad")
                .state("Telangana")
                .email("gunavanth@example.com")
                .phoneNumber("9876543210")
                .gender("Male")
                .occupation("Software Engineer")
                .build();

        System.out.println(person);

        System.out.println("\n PERSON USING SETTERS ");

        PersonSetterDemo.demonstrateSetters();
    }
}