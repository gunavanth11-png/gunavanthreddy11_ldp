package com.example.model;

public class Student {

    private int id;
    private String name;
    private String course;
    private String email;
    private String phone;
    private String address;

    public Student(int id, String name, String course,
                   String email, String phone, String address) {

        this.id = id;
        this.name = name;
        this.course = course;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCourse() {
        return course;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }
}