package com.example.dao;

import com.example.model.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

public class StudentDAO {

    private final SessionFactory sessionFactory;

    public StudentDAO(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void saveStudent(Student student) {

        Session session = sessionFactory.openSession();

        Transaction transaction = session.beginTransaction();

        session.merge(student);

        transaction.commit();

        session.close();
    }
}