/*
 * File: ThemeReadControllerTest.java
 * Purpose: Tests for theme read endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ThemeReadControllerTest {
  @Autowired MockMvc mvc;

  @Test
  void list_themes() throws Exception {
    mvc.perform(get("/api/v1/themes")).andExpect(status().isOk());
  }

  @Test
  void get_active_theme() throws Exception {
    mvc.perform(get("/api/v1/themes/active")).andExpect(status().isOk());
  }

  @Test
  void get_theme_by_id() throws Exception {
    mvc.perform(get("/api/v1/themes/1")).andExpect(status().isOk());
  }
}
