package com.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

    @GetMapping("/public")
    public String publicPage() {
        return "This is a public page";
    }

    @GetMapping("/student")
    public String studentPage() {
        return "Welcome to Student Page";
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "Welcome to Admin Page";
    }
}