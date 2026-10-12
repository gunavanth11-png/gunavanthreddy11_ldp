package com.example.service;

import com.example.model.Student;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class StudentServiceTest {

    private StudentService studentService;

    @BeforeEach
    void setUp() {
        studentService = new StudentService();

        studentService.createStudent(
                new Student(
                        1,
                        "Gunavanth",
                        "AIML",
                        "gunavanth@gmail.com"
                )
        );
    }

    @AfterEach
    void tearDown() {
        studentService.clearStudents();
    }

    @Test
    @DisplayName("Should create a student")
    void createStudentTest() {

        Student student = new Student(
                2,
                "Rahul",
                "CSE",
                "rahul@gmail.com"
        );

        Student result =
                studentService.createStudent(student);

        assertNotNull(result);
        assertEquals("Rahul", result.getName());
        assertEquals("CSE", result.getCourse());
    }

    @Test
    @DisplayName("Should get all students")
    void getAllStudentsTest() {

        List<Student> result =
                studentService.getAllStudents();

        assertNotNull(result);
        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("Should get student by ID")
    void getStudentByIdTest() {

        Student result =
                studentService.getStudentById(1);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Gunavanth", result.getName());
    }

    @Test
    @DisplayName("Should return null for unknown student")
    void getStudentByInvalidIdTest() {

        Student result =
                studentService.getStudentById(99);

        assertNull(result);
    }

    @Test
    @DisplayName("Should update student")
    void updateStudentTest() {

        Student updatedStudent =
                new Student(
                        1,
                        "Gunavanth Updated",
                        "CSE",
                        "updated@gmail.com"
                );

        Student result =
                studentService.updateStudent(
                        1,
                        updatedStudent
                );

        assertAll(
                () -> assertEquals(
                        "Gunavanth Updated",
                        result.getName()
                ),
                () -> assertEquals(
                        "CSE",
                        result.getCourse()
                ),
                () -> assertEquals(
                        "updated@gmail.com",
                        result.getEmail()
                )
        );
    }

    @Test
    @DisplayName("Should delete student")
    void deleteStudentTest() {

        String result =
                studentService.deleteStudent(1);

        assertEquals(
                "Student deleted successfully",
                result
        );

        assertNull(
                studentService.getStudentById(1)
        );
    }

    @Test
    @DisplayName("Should return not found when deleting unknown student")
    void deleteInvalidStudentTest() {

        String result =
                studentService.deleteStudent(99);

        assertEquals(
                "Student not found",
                result
        );
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 2, 3})
    @DisplayName("Should recognize positive IDs")
    void positiveIdTest(int id) {

        assertTrue(id > 0);
    }
}