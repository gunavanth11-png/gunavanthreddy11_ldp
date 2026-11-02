package com.example.controller;

import com.example.dto.StudentDTO;
import com.example.model.Student;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
public class StudentController {

    @GetMapping
    public StudentDTO getStudent() {

        Student student = new Student(
                101,
                "Gunavanth",
                "AIML",
                "gunavanth@gmail.com",
                "9876543210",
                "Hyderabad"
        );


        StudentDTO studentDTO = new StudentDTO(
                student.getId(),
                student.getName(),
                student.getCourse()
        );

        return studentDTO;
    }
}