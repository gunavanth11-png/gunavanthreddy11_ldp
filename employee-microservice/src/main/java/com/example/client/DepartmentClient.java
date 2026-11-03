package com.example.client;

import com.example.dto.DepartmentResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "department-service",
        url = "http://localhost:8082"
)
public interface DepartmentClient {

    @GetMapping("/departments/{id}")
    DepartmentResponse getDepartmentById(
            @PathVariable Long id
    );
}