package com.example.controller;

import com.example.model.Student;
import com.example.service.StudentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(StudentController.class)
class StudentControllerWebMvcTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentService studentService;

    @Test
    void postStudentTest() throws Exception {

        Student student = new Student(
                1,
                "Gunavanth",
                "AIML",
                "gunavanth@gmail.com"
        );

        when(studentService.createStudent(any(Student.class)))
                .thenReturn(student);

        String json = """
                {
                    "id": 1,
                    "name": "Gunavanth",
                    "course": "AIML",
                    "email": "gunavanth@gmail.com"
                }
                """;

        mockMvc.perform(
                        post("/students")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(json)
                )
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Gunavanth"))
                .andExpect(jsonPath("$.course").value("AIML"))
                .andExpect(jsonPath("$.email")
                        .value("gunavanth@gmail.com"));
    }

    @Test
    void getStudentTest() throws Exception {

        Student student = new Student(
                1,
                "Gunavanth",
                "AIML",
                "gunavanth@gmail.com"
        );

        when(studentService.getStudentById(1))
                .thenReturn(student);

        mockMvc.perform(
                        get("/students/1")
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Gunavanth"))
                .andExpect(jsonPath("$.course").value("AIML"))
                .andExpect(jsonPath("$.email")
                        .value("gunavanth@gmail.com"));
    }

    @Test
    void deleteStudentTest() throws Exception {

        when(studentService.deleteStudent(1))
                .thenReturn("Student deleted successfully");

        mockMvc.perform(
                        delete("/students/1")
                )
                .andExpect(status().isOk())
                .andExpect(
                        content().string(
                                "Student deleted successfully"
                        )
                );
    }
}