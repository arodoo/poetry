/*
 * File: ThemeValidationTest.java
 * Purpose: Tests for theme validation errors.
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
class ThemeValidationTest {
  @Autowired MockMvc mvc;

  @Test
  void empty_colors_validation() throws Exception {
    mvc.perform(post("/api/v1/themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Bad\",\"colors\":{}}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.title").exists());
  }

  @Test
  void bad_color_format_validation() throws Exception {
    mvc.perform(post("/api/v1/themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Bad\",\"colors\":{\"primary\":\"blue\"}}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.title").exists());
  }
}
