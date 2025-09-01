/*
 * File: PathLocaleIntegrationTest.java
 * Purpose: Integration tests for path-based locale resolution ensuring
 * precedence over Accept-Language header and fallback behavior. Validates
 * /{locale}/api/v1/health endpoint accessibility without changing controller
 * mappings.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class PathLocaleIntegrationTest {
  @Autowired private MockMvc mvc;

  @Test
  @DisplayName("uses path locale when both path and Accept-Language present")
  void pathLocaleTakesPrecedence() throws Exception {
    mvc.perform(get("/es/api/v1/health").header("Accept-Language", "en"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("Aceptar"));
  }

  @Test
  @DisplayName("falls back to Accept-Language when no path locale")
  void acceptLanguageFallback() throws Exception {
    mvc.perform(get("/api/v1/health").header("Accept-Language", "es"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("Aceptar"));
  }

  @Test
  @DisplayName("default locale when neither header nor path locale present")
  void defaultLocaleWhenNone() throws Exception {
    mvc.perform(get("/api/v1/health"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("OK"));
  }

  @Test
  @DisplayName("unsupported path locale ignored in favor of header")
  void unsupportedPathLocaleIgnored() throws Exception {
    mvc.perform(get("/zz/api/v1/health").header("Accept-Language", "en"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("OK"));
  }
}
