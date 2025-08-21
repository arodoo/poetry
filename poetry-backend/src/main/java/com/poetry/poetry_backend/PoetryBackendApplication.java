/*
 * File: PoetryBackendApplication.java
 * Purpose: Spring Boot application entry point for the poetry backend.
 * This class bootstraps the application context, configures component
 * scanning, and serves as the composition root for production wiring.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PoetryBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(PoetryBackendApplication.class, args);
  }
}
