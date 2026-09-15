package com.example.service;

import com.example.model.Student;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    public Student createStudent(Student student) {
        return student;
    }
}