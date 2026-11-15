package com.example.solidprinciples;

import com.example.solidprinciples.bonus.BonusFactory;
import com.example.solidprinciples.enums.EmployeeRole;
import com.example.solidprinciples.model.Employee;
import com.example.solidprinciples.service.EmployeeService;

public class SolidPrinciplesDemoApplication {

    public static void main(String[] args) {

        BonusFactory bonusFactory = new BonusFactory();

        EmployeeService employeeService =
                new EmployeeService(bonusFactory);

        Employee developer = new Employee(
                "Rahul",
                EmployeeRole.DEVELOPER,
                50000
        );

        Employee manager = new Employee(
                "Priya",
                EmployeeRole.MANAGER,
                80000
        );

        System.out.println("=== SOLID BONUS DEMO ===");

        employeeService.displayEmployeeBonus(developer);
        employeeService.displayEmployeeBonus(manager);
    }
}