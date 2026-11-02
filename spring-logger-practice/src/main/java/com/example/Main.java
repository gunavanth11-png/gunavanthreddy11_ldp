package com.example;

import com.example.service.CarService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {

    public static void main(String[] args) {

        ApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        CarService carService =
                context.getBean(CarService.class);

        carService.startCar();
        carService.stopCar();
        carService.checkFuel(5);
        carService.serviceCar();
    }
}