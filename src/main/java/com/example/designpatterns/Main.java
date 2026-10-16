
package com.example.designpatterns;

import com.example.designpatterns.singleton.AppLogger;
import com.example.designpatterns.builder.Payslip;
import com.example.designpatterns.builder.PayslipBuilder;
import com.example.designpatterns.factory.FoodOrderProcessor;
import com.example.designpatterns.factory.ClothingOrderProcessor;

public class Main {

    public static void main(String[] args) {

        System.out.println("===== SINGLETON PATTERN =====");

        AppLogger logger1 = AppLogger.getInstance();
        AppLogger logger2 = AppLogger.getInstance();

        logger1.log("Application started");
        System.out.println(
                "Same logger object: " + (logger1 == logger2)
        );

        System.out.println("\n===== BUILDER PATTERN =====");

        Payslip payslip = new PayslipBuilder()
                .setEmployeeName("Rahul")
                .setBasic(30000)
                .setHra(10000)
                .setDa(5000)
                .build();

        payslip.display();

        System.out.println("\n===== FACTORY METHOD PATTERN =====");

        FoodOrderProcessor foodProcessor = new FoodOrderProcessor();
        foodProcessor.processOrder();

        ClothingOrderProcessor clothingProcessor =
                new ClothingOrderProcessor();
        clothingProcessor.processOrder();
    }
}
