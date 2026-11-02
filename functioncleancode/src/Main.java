package functioncleancode;

public class Main {

    public static void main(String[] args) {

        System.out.println("1. Method with no parameter");
        MethodWithNoParameter.displayMessage();

        System.out.println("\n2. Method with one parameter");
        MethodWithOneParameter.greetUser("Gunavanth");

        System.out.println("\n3. Method with multiple parameters");
        int sum = MethodWithMultipleParameters.addNumbers(10, 20);
        System.out.println("Sum: " + sum);

        System.out.println("\n4. Small functions");
        SmallFunctions.processStudent();

        System.out.println("\n5. Single responsibility");
        double average = SingleResponsibility.calculateAverage(80, 90, 70);
        SingleResponsibility.displayAverage(average);

        System.out.println("\n6. Avoid flag parameter");
        AvoidFlagParameter.sendWelcomeEmail();
        AvoidFlagParameter.sendGoodbyeEmail();
    }
}