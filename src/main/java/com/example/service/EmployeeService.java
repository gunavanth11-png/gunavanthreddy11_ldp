package com.example.service;

import com.example.client.DepartmentClient;
import com.example.dto.DepartmentResponse;
import com.example.model.Employee;
import com.example.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentClient departmentClient;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee addEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Optional<Employee> updateEmployee(
            Long id,
            Employee employee) {

        return employeeRepository.findById(id)
                .map(existingEmployee -> {

                    existingEmployee.setName(
                            employee.getName()
                    );

                    existingEmployee.setDepartmentId(
                            employee.getDepartmentId()
                    );

                    existingEmployee.setRole(
                            employee.getRole()
                    );

                    return employeeRepository.save(
                            existingEmployee
                    );
                });
    }

    public boolean deleteEmployee(Long id) {

        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return true;
        }

        return false;
    }

    public Map<String, Object> getEmployeeDetails(Long id) {

        Employee employee = employeeRepository
                .findById(id)
                .orElseThrow();

        DepartmentResponse department =
                departmentClient.getDepartmentById(
                        employee.getDepartmentId()
                );

        Map<String, Object> response =
                new HashMap<>();

        response.put("id", employee.getId());
        response.put("name", employee.getName());
        response.put("role", employee.getRole());
        response.put(
                "departmentId",
                employee.getDepartmentId()
        );
        response.put(
                "department",
                department.getName()
        );

        return response;
    }
}