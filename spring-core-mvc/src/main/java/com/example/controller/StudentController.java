package com.example.controller;

import com.example.model.Student;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class StudentController {

    @GetMapping("/student")
    public Student getStudent() {
        return new Student(103, "gunavanth", "java");
    }

    @PostMapping("/student")
    public Student createStudent(@RequestBody Student student) {
        return student;
    }
}