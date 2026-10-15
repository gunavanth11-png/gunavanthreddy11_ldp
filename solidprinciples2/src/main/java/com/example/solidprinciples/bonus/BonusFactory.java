package com.example.solidprinciples.bonus;

import com.example.solidprinciples.enums.EmployeeRole;
import com.example.solidprinciples.exception.InvalidBonusException;
import com.example.solidprinciples.strategy.BonusStrategy;
import com.example.solidprinciples.strategy.DeveloperBonus;
import com.example.solidprinciples.strategy.ManagerBonus;

public class BonusFactory {

    public BonusStrategy getStrategy(EmployeeRole role) {

        return switch (role) {
            case DEVELOPER -> new DeveloperBonus();
            case MANAGER -> new ManagerBonus();
            default -> throw new InvalidBonusException(
                    "Bonus strategy not available for: " + role
            );
        };
    }
}