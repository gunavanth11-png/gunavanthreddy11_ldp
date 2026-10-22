package com.example.solidprinciples.service;

import com.example.solidprinciples.bonus.BonusFactory;
import com.example.solidprinciples.model.Employee;
import com.example.solidprinciples.strategy.BonusStrategy;

public class EmployeeService {

    private final BonusFactory bonusFactory;

    public EmployeeService(BonusFactory bonusFactory) {
        this.bonusFactory = bonusFactory;
    }

    public void displayEmployeeBonus(Employee employee) {

        BonusStrategy strategy =
                bonusFactory.getStrategy(employee.getRole());

        double bonus = strategy.calculateBonus(employee);

        System.out.println("------------------------------");
        System.out.println("Employee Name : " + employee.getName());
        System.out.println("Employee Role : " + employee.getRole());
        System.out.println("Salary        : " + employee.getSalary());
        System.out.println("Bonus         : " + bonus);
        System.out.println("Total Amount  : "
                + (employee.getSalary() + bonus));
        System.out.println("------------------------------");
    }
}