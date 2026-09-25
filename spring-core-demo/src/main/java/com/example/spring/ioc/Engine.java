package com.example.spring.ioc;

import org.springframework.stereotype.Component;

@Component
public class Engine {

    public void start() {
        System.out.println("Engine started");
    }
}