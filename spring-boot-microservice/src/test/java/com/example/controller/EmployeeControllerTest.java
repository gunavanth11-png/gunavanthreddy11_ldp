package com.example.controller;

import com.example.entity.Employee;
import com.example.service.EmployeeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeControllerTest {

    @Mock
    private EmployeeService employeeService;

    @InjectMocks
    private EmployeeController employeeController;

    @Test
    void createEmployee_shouldReturnEmployee() {
        Employee employee =
                new Employee(1L, "Gunavanth", "IT", "Developer");

        when(employeeService.createEmployee(employee))
                .thenReturn(employee);

        Employee result =
                employeeController.createEmployee(employee);

        assertNotNull(result);
        assertEquals("Gunavanth", result.getName());
        assertEquals("IT", result.getDepartment());
        assertEquals("Developer", result.getRole());

        verify(employeeService).createEmployee(employee);
    }

    @Test
    void getAllEmployees_shouldReturnEmployees() {
        Employee employee1 =
                new Employee(1L, "Gunavanth", "IT", "Developer");

        Employee employee2 =
                new Employee(2L, "Rahul", "HR", "Manager");

        List<Employee> employees =
                Arrays.asList(employee1, employee2);

        when(employeeService.getAllEmployees())
                .thenReturn(employees);

        List<Employee> result =
                employeeController.getAllEmployees();

        assertEquals(2, result.size());
        assertEquals("Gunavanth", result.get(0).getName());
        assertEquals("Rahul", result.get(1).getName());

        verify(employeeService).getAllEmployees();
    }

    @Test
    void getEmployeeById_shouldReturnEmployeeWhenFound() {
        Employee employee =
                new Employee(1L, "Gunavanth", "IT", "Developer");

        when(employeeService.getEmployeeById(1L))
                .thenReturn(Optional.of(employee));

        ResponseEntity<Employee> result =
                employeeController.getEmployeeById(1L);

        assertEquals(200, result.getStatusCode().value());
        assertNotNull(result.getBody());
        assertEquals("Gunavanth", result.getBody().getName());

        verify(employeeService).getEmployeeById(1L);
    }

    @Test
    void getEmployeeById_shouldReturnNotFoundWhenEmployeeDoesNotExist() {
        when(employeeService.getEmployeeById(1L))
                .thenReturn(Optional.empty());

        ResponseEntity<Employee> result =
                employeeController.getEmployeeById(1L);

        assertEquals(404, result.getStatusCode().value());
        assertNull(result.getBody());

        verify(employeeService).getEmployeeById(1L);
    }

    @Test
    void updateEmployee_shouldReturnUpdatedEmployee() {
        Employee employee =
                new Employee(1L, "Gunavanth", "Development", "Senior Developer");

        when(employeeService.updateEmployee(1L, employee))
                .thenReturn(employee);

        Employee result =
                employeeController.updateEmployee(1L, employee);

        assertNotNull(result);
        assertEquals("Gunavanth", result.getName());
        assertEquals("Development", result.getDepartment());
        assertEquals("Senior Developer", result.getRole());

        verify(employeeService).updateEmployee(1L, employee);
    }

    @Test
    void deleteEmployee_shouldReturnSuccessMessage() {
        doNothing().when(employeeService).deleteEmployee(1L);

        ResponseEntity<String> result =
                employeeController.deleteEmployee(1L);

        assertEquals(200, result.getStatusCode().value());
        assertEquals("Employee deleted successfully", result.getBody());

        verify(employeeService).deleteEmployee(1L);
    }
}