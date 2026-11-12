package com.example.solidprinciples.strategy;

import com.example.solidprinciples.model.Employee;

public interface BonusStrategy {

    double calculateBonus(Employee employee);
}