/*
 * File: ThemeCreateTest.java
 * Purpose: Tests for theme creation and activation.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ThemeCreateTest {
  @Autowired MockMvc mvc;

  @Test
  void create_theme() throws Exception {
    String createBody = "{\"name\":\"Test Theme\"," +
        "\"colors\":{\"primary\":\"hsl(10 60% 50%)\"," +
        "\"secondary\":\"#ff00aa\",\"accent\":\"var(--x)\"}}";
    mvc.perform(post("/api/v1/themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(createBody))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.active").value(false));
  }

  @Test
  void activate_theme() throws Exception {
    // Assuming theme 1 exists
    mvc.perform(put("/api/v1/themes/1/activate"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.active").value(true));
  }
}
