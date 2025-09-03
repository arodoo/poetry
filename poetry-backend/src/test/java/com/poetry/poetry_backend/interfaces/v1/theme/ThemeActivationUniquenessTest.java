/*
 * File: ThemeActivationUniquenessTest.java
 * Purpose: Ensures only one theme remains active after multiple activations.
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
class ThemeActivationUniquenessTest {
  @Autowired MockMvc mvc;

  @Test
  void only_one_active_after_reactivation() throws Exception {
    String firstThemeBody = "{\"name\":\"A1\",\"colors\":{\"primary\":\"#abc123\"}}";
    String secondThemeBody = "{\"name\":\"A2\",\"colors\":{\"primary\":\"#def456\"}}";
    String firstThemeResponse = mvc.perform(post("/api/v1/themes")
        .contentType(MediaType.APPLICATION_JSON).content(firstThemeBody))
        .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
    String secondThemeResponse = mvc.perform(post("/api/v1/themes")
        .contentType(MediaType.APPLICATION_JSON).content(secondThemeBody))
        .andExpect(status().isCreated()).andReturn().getResponse().getContentAsString();
    String firstThemeId = firstThemeResponse.replaceAll(".*\\\"id\\\":(\\d+).*", "$1");
    String secondThemeId = secondThemeResponse.replaceAll(".*\\\"id\\\":(\\d+).*", "$1");
    mvc.perform(put("/api/v1/themes/" + firstThemeId + "/activate")).andExpect(status().isOk())
        .andExpect(jsonPath("$.active").value(true));
    mvc.perform(put("/api/v1/themes/" + secondThemeId + "/activate")).andExpect(status().isOk())
        .andExpect(jsonPath("$.active").value(true));
    mvc.perform(get("/api/v1/themes/" + firstThemeId)).andExpect(status().isOk())
        .andExpect(jsonPath("$.active").value(false));
    mvc.perform(get("/api/v1/themes/" + secondThemeId)).andExpect(status().isOk())
        .andExpect(jsonPath("$.active").value(true));
    mvc.perform(get("/api/v1/themes/active")).andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(Integer.parseInt(secondThemeId))); }
}
