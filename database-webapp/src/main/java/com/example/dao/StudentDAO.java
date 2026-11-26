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

    public Student save(Student student) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();

        session.persist(student);

        transaction.commit();
        session.close();

        return student;
    }

    public List<Student> findAll() {
        Session session = sessionFactory.openSession();

        List<Student> students =
                session.createQuery("from Student", Student.class)
                        .getResultList();

        session.close();

        return students;
    }

    public Student findById(int id) {
        Session session = sessionFactory.openSession();

        Student student = session.get(Student.class, id);

        session.close();

        return student;
    }

    public Student update(int id, Student student) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();

        Student existingStudent = session.get(Student.class, id);

        if (existingStudent != null) {
            existingStudent.setName(student.getName());
            existingStudent.setCourse(student.getCourse());
            existingStudent.setEmail(student.getEmail());
        }

        transaction.commit();
        session.close();

        return existingStudent;
    }

    public void delete(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();

        Student student = session.get(Student.class, id);

        if (student != null) {
            session.remove(student);
        }

        transaction.commit();
        session.close();
    }
}