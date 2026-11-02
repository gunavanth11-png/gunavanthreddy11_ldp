package com.example;

import com.example.model.College;
import com.example.model.Student;
import com.example.service.StudentService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public College college() {
        return new College("ABC Engineering College");
    }

    @Bean
    public Student student() {
        return new Student(101, "Gunavanth", "AIML");
    }

    @Bean
    public StudentService studentService(Student student, College college) {
        return new StudentService(student, college);
    }
}