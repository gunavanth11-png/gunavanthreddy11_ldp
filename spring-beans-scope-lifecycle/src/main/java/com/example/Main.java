package com.example;

import com.example.service.CarService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        CarService car1 = context.getBean(CarService.class);
        CarService car2 = context.getBean(CarService.class);

        System.out.println("Same object: " + (car1 == car2));

        car1.startCar();
        car2.startCar();

        context.close();
    }
}
