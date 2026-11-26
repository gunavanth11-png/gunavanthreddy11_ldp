package com.example.dao;

import com.example.model.Student;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class StudentDAO {

    private final SessionFactory sessionFactory;

    public StudentDAO(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    public void saveStudent(Student student) {

        Session session = sessionFactory.openSession();

        Transaction transaction = session.beginTransaction();

        session.persist(student);

        transaction.commit();

        session.close();
    }


    public Student getStudent(int id) {

        Session session = sessionFactory.openSession();

        Student student = session.find(Student.class, id);

        session.close();

        return student;
    }

    public List<Student> getAllStudents() {

        Session session = sessionFactory.openSession();

        List<Student> students =
                session.createQuery(
                        "FROM Student",
                        Student.class
                ).getResultList();

        session.close();

        return students;
    }

    public void updateStudent(Student student) {

        Session session = sessionFactory.openSession();

        Transaction transaction = session.beginTransaction();

        session.merge(student);

        transaction.commit();

        session.close();
    }

    public void deleteStudent(int id) {

        Session session = sessionFactory.openSession();

        Transaction transaction = session.beginTransaction();

        Student student = session.find(Student.class, id);

        if (student != null) {
            session.remove(student);
        }

        transaction.commit();

        session.close();
    }
}