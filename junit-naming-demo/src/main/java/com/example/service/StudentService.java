package com.example.service;

import com.example.model.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private final List<Student> students = new ArrayList<>();

    public StudentService() {
        students.add(new Student(1, "Gunavanth", "AIML"));
        students.add(new Student(2, "Rahul", "CSE"));
    }

    public List<Student> getAllStudents() {
        return students;
    }

    public Student getStudentById(int id) {
        return students.stream()
                .filter(student -> student.getId() == id)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Student createStudent(Student student) {
        students.add(student);
        return student;
    }

    public void deleteStudent(int id) {
        Student student = getStudentById(id);
        students.remove(student);
    }
}