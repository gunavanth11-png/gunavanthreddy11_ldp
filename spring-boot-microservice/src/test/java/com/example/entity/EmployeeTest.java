package com.example.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class EmployeeTest {

    @Test
    void employee_shouldSetAndGetAllFields() {
        Employee employee = new Employee();

        employee.setId(1L);
        employee.setName("Gunavanth");
        employee.setDepartment("IT");
        employee.setRole("Developer");

        assertEquals(1L, employee.getId());
        assertEquals("Gunavanth", employee.getName());
        assertEquals("IT", employee.getDepartment());
        assertEquals("Developer", employee.getRole());
    }

    @Test
    void employee_shouldCreateUsingParameterizedConstructor() {
        Employee employee =
                new Employee(1L, "Gunavanth", "IT", "Developer");

        assertEquals(1L, employee.getId());
        assertEquals("Gunavanth", employee.getName());
        assertEquals("IT", employee.getDepartment());
        assertEquals("Developer", employee.getRole());
    }
}