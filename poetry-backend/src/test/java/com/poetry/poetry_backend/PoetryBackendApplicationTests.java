/*
 Smoke test that verifies the Spring Boot application context starts.
 It exercises component scanning and bean wiring without touching
 business logic. This acts as a guard against configuration regressions
 in the composition root. All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PoetryBackendApplicationTests {

  @Test
  void contextLoads() {}
}
