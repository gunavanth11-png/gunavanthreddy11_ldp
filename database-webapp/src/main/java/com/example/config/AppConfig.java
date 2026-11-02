package com.example.config;

import com.example.dao.StudentDAO;
import com.example.service.StudentService;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@org.springframework.context.annotation.Configuration
@ComponentScan("com.example")
public class AppConfig {

    @Bean
    public SessionFactory sessionFactory() {
        return new Configuration()
                .configure("hibernate.cfg.xml")
                .buildSessionFactory();
    }

    @Bean
    public StudentDAO studentDAO(SessionFactory sessionFactory) {
        return new StudentDAO(sessionFactory);
    }

    @Bean
    public StudentService studentService(StudentDAO studentDAO) {
        return new StudentService(studentDAO);
    }
}