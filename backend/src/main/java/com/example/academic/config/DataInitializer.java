package com.example.academic.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.academic.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Default users are now created via database_setup.sql
        // This initializer is kept for backward compatibility but does nothing
        System.out.println("DataInitializer: Users should be loaded from database_setup.sql");
    }
}
