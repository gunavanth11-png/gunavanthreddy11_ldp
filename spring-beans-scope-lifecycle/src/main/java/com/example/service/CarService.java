package com.example.service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class CarService {

    public CarService() {
        System.out.println("1. CarService Bean created");
    }

    @PostConstruct
    public void initialize() {
        System.out.println("2. CarService initialized");
    }

    public void startCar() {
        System.out.println("3. Car started");
    }

    @PreDestroy
    public void destroy() {
        System.out.println("4. CarService destroyed");
    }
}