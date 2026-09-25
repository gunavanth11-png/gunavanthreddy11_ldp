package com.example.dao;

import com.example.model.College;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

public class CollegeDAO {

    private final SessionFactory sessionFactory;

    public CollegeDAO(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void saveCollege(College college) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();

        session.persist(college);

        transaction.commit();
        session.close();
    }
}