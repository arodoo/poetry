/*
 * File: ApiIndexControllerTest.java
 * Purpose: Unit tests for the API index controller to validate
 * response shapes and routing behavior. Tests ensure index
 * endpoints remain stable and adhere to expected contracts.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ApiIndexControllerTest {
  @Autowired MockMvc mvc;

  @Test
  void index_shouldExposeApiDiscovery() throws Exception {
    mvc.perform(get("/api"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.v1").value("/api/v1"))
        .andExpect(jsonPath("$.docs").value("/v3/api-docs"))
        .andExpect(jsonPath("$.swagger").value("/swagger-ui.html"));
  }
}
