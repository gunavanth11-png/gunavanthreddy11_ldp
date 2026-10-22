package com.example.solidprinciples.strategy;

import com.example.solidprinciples.model.Employee;

public class ManagerBonus implements BonusStrategy {

    @Override
    public double calculateBonus(Employee employee) {
        return employee.getSalary() * 0.20;
    }
}