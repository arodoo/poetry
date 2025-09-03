/*
 * File: ThemeUpdateDeleteTest.java
 * Purpose: Tests for theme update and delete.
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
class ThemeUpdateDeleteTest {
  @Autowired MockMvc mvc;

  @Test
  void update_theme() throws Exception {
    // Assuming theme 1 exists
    String updateBody = "{\"name\":\"Updated Theme\"," +
        "\"colors\":{\"primary\":\"hsl(20 60% 50%)\"," +
        "\"secondary\":\"#00ffaa\",\"accent\":\"var(--y)\"}}";
    mvc.perform(put("/api/v1/themes/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content(updateBody))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("Updated Theme"));
  }

  @Test
  void delete_theme() throws Exception {
    // Create a theme to delete
    String createBody = "{\"name\":\"Delete Me\"," +
        "\"colors\":{\"primary\":\"hsl(30 60% 50%)\"," +
        "\"secondary\":\"#aa00ff\",\"accent\":\"var(--z)\"}}";
    String resp = mvc.perform(post("/api/v1/themes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(createBody))
        .andExpect(status().isCreated())
        .andReturn().getResponse().getContentAsString();
    String id = resp.replaceAll(".*\\\"id\\\":(\\d+).*", "$1");
    // delete theme
    mvc.perform(delete("/api/v1/themes/" + id))
        .andExpect(status().isNoContent());
    // verify deleted
    mvc.perform(get("/api/v1/themes/" + id))
        .andExpect(status().isNotFound());
  }
}
