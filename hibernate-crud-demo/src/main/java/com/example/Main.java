package com.example;

import com.example.dao.StudentDAO;
import com.example.model.Student;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class Main {

    public static void main(String[] args) {

        SessionFactory sessionFactory =
                new Configuration()
                        .configure()
                        .buildSessionFactory();

        StudentDAO studentDAO =
                new StudentDAO(sessionFactory);

        Student student =
                new Student(
                        "Gunavanth",
                        "AIML",
                        "gunavanth@gmail.com"
                );

        studentDAO.saveStudent(student);

        System.out.println("Student saved successfully.");

        Student foundStudent =
                studentDAO.getStudent(student.getId());

        System.out.println("Student from database:");
        System.out.println(foundStudent);

        sessionFactory.close();
    }
}