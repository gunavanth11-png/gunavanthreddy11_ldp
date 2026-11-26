package com.example;

import com.example.config.AppConfig;
import com.example.service.StudentService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {

    public static void main(String[] args) {

        ApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        StudentService studentService =
                context.getBean(StudentService.class);

        studentService.addStudent();
        studentService.getStudent();
    }
}