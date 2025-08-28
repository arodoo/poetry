/*
 * File: LocalePreferenceControllerTest.java
 * Purpose: Verify locale preference endpoints allow setting and retrieving
 * a user's persisted locale value and default Spanish fallback when no
 * preference stored. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.locale;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = { "app.default-locale=es", "app.supported-locales=es,en" })
class LocalePreferenceControllerTest {
  @Autowired private MockMvc mvc;

  @Test
  void defaultLocaleIsSpanishWhenNoPreference() throws Exception {
    mvc.perform(get("/v1/me/locale").header("X-User-Id", "u-default"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.locale").value("es"));
  }

  @Test
  void setAndGetLocale() throws Exception {
    mvc.perform(put("/v1/me/locale").header("X-User-Id", "u1")
        .contentType(MediaType.APPLICATION_JSON)
        .content("{\"locale\":\"en\"}"))
        .andExpect(status().isNoContent());

    mvc.perform(get("/v1/me/locale").header("X-User-Id", "u1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.locale").value("en"));
  }
}
