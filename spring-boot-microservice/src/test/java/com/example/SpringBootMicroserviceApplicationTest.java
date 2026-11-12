package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import org.mockito.MockedStatic;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mockStatic;

class SpringBootMicroserviceApplicationTest {

    @Test
    void main_shouldStartApplication() {
        try (MockedStatic<SpringApplication> springApplication =
                     mockStatic(SpringApplication.class)) {

            SpringBootMicroserviceApplication.main(new String[]{});

            springApplication.verify(() ->
                    SpringApplication.run(
                            SpringBootMicroserviceApplication.class,
                            new String[]{}
                    ));
        }
    }

    @Test
    void applicationClass_shouldBeCreated() {
        SpringBootMicroserviceApplication application =
                new SpringBootMicroserviceApplication();

        assertNotNull(application);
    }
}