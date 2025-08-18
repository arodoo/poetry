/*
 Entry point that boots the Spring application context. It delegates to
 Spring Boot to scan configuration classes, build the dependency graph,
 and start the embedded server. No business logic lives here to keep the
 composition root separate from domain and application layers. This
 preserves Clean Architecture boundaries and supports testability.
 All Rights Reserved. Arodi Emmanuel
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
