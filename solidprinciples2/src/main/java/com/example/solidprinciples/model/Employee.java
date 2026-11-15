package com.example.solidprinciples.model;

import com.example.solidprinciples.enums.EmployeeRole;

public class Employee {

    private final String name;
    private final EmployeeRole role;
    private final double salary;

    public Employee(String name, EmployeeRole role, double salary) {
        this.name = name;
        this.role = role;
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public EmployeeRole getRole() {
        return role;
    }

    public double getSalary() {
        return salary;
    }
}