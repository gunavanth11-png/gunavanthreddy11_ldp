package com.example.service;

import com.example.entity.Employee;
import com.example.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @Test
    void createEmployee_shouldSaveEmployee() {
        Employee employee = new Employee(1L, "Gunavanth", "IT", "Developer");

        when(employeeRepository.save(employee)).thenReturn(employee);

        Employee result = employeeService.createEmployee(employee);

        assertNotNull(result);
        assertEquals("Gunavanth", result.getName());
        assertEquals("IT", result.getDepartment());
        assertEquals("Developer", result.getRole());

        verify(employeeRepository).save(employee);
    }

    @Test
    void getAllEmployees_shouldReturnEmployees() {
        Employee employee1 =
                new Employee(1L, "Gunavanth", "IT", "Developer");

        Employee employee2 =
                new Employee(2L, "Rahul", "HR", "Manager");

        List<Employee> employees = Arrays.asList(employee1, employee2);

        when(employeeRepository.findAll()).thenReturn(employees);

        List<Employee> result = employeeService.getAllEmployees();

        assertEquals(2, result.size());
        assertEquals("Gunavanth", result.get(0).getName());
        assertEquals("Rahul", result.get(1).getName());

        verify(employeeRepository).findAll();
    }

    @Test
    void getEmployeeById_shouldReturnEmployee() {
        Employee employee =
                new Employee(1L, "Gunavanth", "IT", "Developer");

        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(employee));

        Optional<Employee> result =
                employeeService.getEmployeeById(1L);

        assertTrue(result.isPresent());
        assertEquals("Gunavanth", result.get().getName());
        assertEquals("IT", result.get().getDepartment());
        assertEquals("Developer", result.get().getRole());

        verify(employeeRepository).findById(1L);
    }

    @Test
    void getEmployeeById_shouldReturnEmptyWhenEmployeeNotFound() {
        when(employeeRepository.findById(1L))
                .thenReturn(Optional.empty());

        Optional<Employee> result =
                employeeService.getEmployeeById(1L);

        assertTrue(result.isEmpty());

        verify(employeeRepository).findById(1L);
    }

    @Test
    void updateEmployee_shouldUpdateEmployee() {
        Employee existingEmployee =
                new Employee(1L, "Old Name", "IT", "Developer");

        Employee updatedEmployee =
                new Employee(1L, "Gunavanth", "Engineering", "Senior Developer");

        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(existingEmployee));

        when(employeeRepository.save(existingEmployee))
                .thenReturn(existingEmployee);

        Employee result =
                employeeService.updateEmployee(1L, updatedEmployee);

        assertEquals("Gunavanth", result.getName());
        assertEquals("Engineering", result.getDepartment());
        assertEquals("Senior Developer", result.getRole());

        verify(employeeRepository).findById(1L);
        verify(employeeRepository).save(existingEmployee);
    }

    @Test
    void updateEmployee_shouldThrowExceptionWhenEmployeeNotFound() {
        Employee updatedEmployee =
                new Employee(1L, "Gunavanth", "IT", "Developer");

        when(employeeRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                RuntimeException.class,
                () -> employeeService.updateEmployee(1L, updatedEmployee)
        );

        verify(employeeRepository).findById(1L);
        verify(employeeRepository, never()).save(any(Employee.class));
    }

    @Test
    void deleteEmployee_shouldDeleteEmployee() {
        when(employeeRepository.existsById(1L))
                .thenReturn(true);

        employeeService.deleteEmployee(1L);

        verify(employeeRepository).existsById(1L);
        verify(employeeRepository).deleteById(1L);
    }

    @Test
    void deleteEmployee_shouldThrowExceptionWhenEmployeeNotFound() {
        when(employeeRepository.existsById(1L))
                .thenReturn(false);

        assertThrows(
                RuntimeException.class,
                () -> employeeService.deleteEmployee(1L)
        );

        verify(employeeRepository).existsById(1L);
        verify(employeeRepository, never()).deleteById(1L);
    }
}