package solidprinciples;

import solidprinciples.single.Employee;
import solidprinciples.single.EmployeeReport;

import solidprinciples.openclosed.Circle;
import solidprinciples.openclosed.AreaCalculator;

import solidprinciples.liskov.Bird;
import solidprinciples.liskov.Sparrow;
import solidprinciples.liskov.Penguin;

import solidprinciples.interfacesegregation.Printer;

import solidprinciples.dependencyinversion.MessageService;
import solidprinciples.dependencyinversion.EmailService;
import solidprinciples.dependencyinversion.NotificationService;

public class Main {

    public static void main(String[] args) {

        System.out.println(" solid principles");

        System.out.println("\n SINGLE RESPONSIBILITY");

        Employee employee = new Employee("Gunavanth", 50000);

        EmployeeReport employeeReport = new EmployeeReport();

        employeeReport.generateReport(employee);


        System.out.println("\n OPEN/CLOSED PRINCIPLE");

        Circle circle = new Circle(5);

        AreaCalculator areaCalculator = new AreaCalculator();

        double area = areaCalculator.calculateArea(circle);

        System.out.println("Circle Area: " + area);


        System.out.println("\nLISKOV SUBSTITUTION PRINCIPLE");

        Bird bird = new Bird();
        bird.eat();

        Sparrow sparrow = new Sparrow();
        sparrow.eat();
        sparrow.fly();

        Penguin penguin = new Penguin();
        penguin.eat();
        penguin.swim();


        System.out.println("\n INTERFACE SEGREGATION PRINCIPLE");

        Printer printer = new Printer();

        printer.print();


        System.out.println("\n DEPENDENCY INVERSION PRINCIPLE");

        MessageService messageService = new EmailService();

        NotificationService notificationService =
                new NotificationService(messageService);

        notificationService.notifyUser("Welcome to the application.");


        System.out.println("\nALL SOLID PRINCIPLES COMPLETED");
    }
}