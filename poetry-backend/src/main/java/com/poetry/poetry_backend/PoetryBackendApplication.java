/*
 File: PoetryBackendApplication.java
 Purpose: Spring Boot application bootstrap for Poetry backend service.
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
