package com.example;

import com.example.dao.CollegeDAO;
import com.example.dao.StudentDAO;
import com.example.model.Address;
import com.example.model.College;
import com.example.model.Student;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class Main {

    public static void main(String[] args) {

        SessionFactory sessionFactory =
                new Configuration()
                        .configure()
                        .buildSessionFactory();

        CollegeDAO collegeDAO =
                new CollegeDAO(sessionFactory);

        StudentDAO studentDAO =
                new StudentDAO(sessionFactory);

        College college =
                new College("ABC Engineering College");

        collegeDAO.saveCollege(college);

        Address address1 =
                new Address("Hyderabad", "Telangana");

        Student student1 =
                new Student("Gunavanth", "AIML", address1);

        Address address2 =
                new Address("Warangal", "Telangana");

        Student student2 =
                new Student("Rahul", "CSE", address2);

        college.addStudent(student1);
        college.addStudent(student2);

        studentDAO.saveStudent(student1);
        studentDAO.saveStudent(student2);

        System.out.println("Students saved successfully.");

        System.out.println(student1);
        System.out.println(student2);

        System.out.println("College:");
        System.out.println(college);

        sessionFactory.close();
    }
}