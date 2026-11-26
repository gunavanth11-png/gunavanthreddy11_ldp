package com.example.service;

import com.example.model.College;
import com.example.model.Student;

public class StudentService {

    private final Student student;
    private final College college;

    public StudentService(Student student, College college) {
        this.student = student;
        this.college = college;
    }

    public void displayStudent() {

        System.out.println("Student Details:");
        System.out.println(student);

        System.out.println("College Details:");
        System.out.println(college);
    }
}