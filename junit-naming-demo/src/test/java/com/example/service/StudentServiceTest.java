package com.example.service;

import com.example.model.Student;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class StudentServiceTest {

    private StudentService studentService;

    @BeforeEach
    void setUp() {
        studentService = new StudentService();
    }

    @Test
    void shouldReturnAllStudents() {
        List<Student> students = studentService.getAllStudents();

        assertEquals(2, students.size());
    }

    @Test
    void shouldReturnStudentWhenValidIdIsProvided() {
        Student student = studentService.getStudentById(1);

        assertEquals("Gunavanth", student.getName());
        assertEquals("AIML", student.getCourse());
    }

    @Test
    void shouldThrowExceptionWhenStudentDoesNotExist() {
        assertThrows(
                RuntimeException.class,
                () -> studentService.getStudentById(100)
        );
    }

    @Test
    void shouldCreateStudentWhenValidDataIsProvided() {
        Student student = new Student(3, "Ravi", "ECE");

        Student result = studentService.createStudent(student);

        assertEquals(3, result.getId());
        assertEquals("Ravi", result.getName());
    }

    @Test
    void shouldDeleteStudentWhenValidIdIsProvided() {
        studentService.deleteStudent(1);

        assertThrows(
                RuntimeException.class,
                () -> studentService.getStudentById(1)
        );
    }
}