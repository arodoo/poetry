/*
 * File: ThemeAdditionalValidationTest.java
 * Purpose: Extra validation edge cases (name length, key length, value length).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ThemeAdditionalValidationTest {
  @Autowired MockMvc mvc;

  @Test
  void name_too_long() throws Exception {
    String name = "N".repeat(51);
    mvc.perform(post("/api/v1/themes").contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"" + name + "\",\"colors\":{\"p\":\"#abc123\"}}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.detail").value("theme.name.invalid")); }

  @Test
  void color_key_too_long() throws Exception {
    String key = "k".repeat(31);
    mvc.perform(post("/api/v1/themes").contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Ok\",\"colors\":{\"" + key + "\":\"#abc123\"}}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.detail").value("theme.color.key.invalid")); }

  @Test
  void color_value_too_long() throws Exception {
    String val = "#" + "a".repeat(41);
    mvc.perform(post("/api/v1/themes").contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Ok\",\"colors\":{\"p\":\"" + val + "\"}}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.detail").value("theme.color.value.invalid")); }
}
