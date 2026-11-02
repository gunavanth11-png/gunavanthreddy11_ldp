package com.example.service;

import org.springframework.stereotype.Component;

@Component
public class StudentService {

    public void addStudent() {
        System.out.println("Student added successfully");
    }

    public void getStudent() {
        System.out.println("Student details retrieved");
    }
}