package com.example.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class CarService {

    private static final Logger logger =
            LoggerFactory.getLogger(CarService.class);

    public void startCar() {

        logger.debug("Checking car before starting");
        logger.info("Car started successfully");
    }

    public void stopCar() {

        logger.debug("Checking car before stopping");
        logger.info("Car stopped");
    }

    public void checkFuel(int fuel) {

        logger.debug("Checking fuel level: {}", fuel);

        if (fuel < 10) {
            logger.warn("Fuel level is very low: {}", fuel);
        } else {
            logger.info("Fuel level is sufficient: {}", fuel);
        }
    }

    public void serviceCar() {

        try {
            int result = 10 / 0;
        } catch (Exception e) {
            logger.error("Error occurred while servicing the car", e);
        }
    }
}