package com.example.service;

import com.example.dao.StudentDAO;
import com.example.model.Student;

import java.util.List;

public class StudentService {

    private final StudentDAO studentDAO;

    public StudentService(StudentDAO studentDAO) {
        this.studentDAO = studentDAO;
    }

    public Student saveStudent(Student student) {
        return studentDAO.save(student);
    }

    public List<Student> getAllStudents() {
        return studentDAO.findAll();
    }

    public Student getStudentById(int id) {
        return studentDAO.findById(id);
    }

    public Student updateStudent(int id, Student student) {
        return studentDAO.update(id, student);
    }

    public void deleteStudent(int id) {
        studentDAO.delete(id);
    }
}