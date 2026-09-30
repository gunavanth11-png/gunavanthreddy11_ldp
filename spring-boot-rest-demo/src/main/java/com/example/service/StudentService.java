package com.example.service;

import com.example.model.Student;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    private final List<Student> students = new ArrayList<>();

    public Student createStudent(Student student) {

        students.add(student);

        return student;
    }

    public List<Student> getAllStudents() {

        return new ArrayList<>(students);
    }

    public Student getStudentById(int id) {

        for (Student student : students) {

            if (student.getId() == id) {
                return student;
            }
        }

        return null;
    }

    public Student updateStudent(int id, Student updatedStudent) {

        for (Student student : students) {

            if (student.getId() == id) {

                student.setName(updatedStudent.getName());
                student.setCourse(updatedStudent.getCourse());
                student.setEmail(updatedStudent.getEmail());

                return student;
            }
        }

        return null;
    }

    public String deleteStudent(int id) {

        for (Student student : students) {

            if (student.getId() == id) {

                students.remove(student);

                return "Student deleted successfully";
            }
        }

        return "Student not found";
    }

    public void clearStudents() {
        students.clear();
    }
}