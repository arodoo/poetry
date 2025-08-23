/*
 * File: AuthControllerNegativeTest.java
 * Purpose: Negative and misuse path tests for authentication endpoints
 * covering invalid credentials, duplicate registration, invalid refresh
 * token reuse/misuse and logout then refresh. Ensures security behavior
 * and error mapping (ProblemDetail codes) remain stable.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import static com.poetry.poetry_backend.interfaces.v1.auth.AuthTestConstants.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthControllerNegativeTest {
  @Autowired MockMvc mvc;

  @Test
  @DisplayName("login invalid credentials -> 401 problem code auth.invalid_credentials")
  void login_invalid_credentials() throws Exception {
    mvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
            .content(String.format(
                "{\"username\":\"%s\",\"password\":\"%s\"}",
                INVALID_USERNAME, INVALID_PASSWORD)))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.code").value("auth.invalid_credentials"));
  }

  @Test
  @DisplayName("register duplicate username -> 409 problem code auth.duplicate_user")
  void register_duplicate() throws Exception {
    // First register the user
    mvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON)
            .content(String.format(
                "{\"user\":{\"username\":\"%s\",\"password\":\"%s\"}}",
                DUPLICATE_USERNAME, DUPLICATE_PASSWORD)))
        .andExpect(status().isOk());
    
    // Then try to register same username again
    mvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON)
            .content(String.format(
                "{\"user\":{\"username\":\"%s\",\"password\":\"%s\"}}",
                DUPLICATE_USERNAME, "different_password")))
        .andExpect(status().isConflict())
        .andExpect(jsonPath("$.code").value("auth.duplicate_user"));
  }

  @Test
  @DisplayName("refresh with invalid token -> 401 problem auth.invalid_refresh_token")
  void refresh_invalid() throws Exception {
    mvc.perform(post("/api/v1/auth/refresh").contentType(MediaType.APPLICATION_JSON)
            .content("{\"refreshToken\":\"bogus\"}"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.code").value("auth.invalid_refresh_token"));
  }
}
