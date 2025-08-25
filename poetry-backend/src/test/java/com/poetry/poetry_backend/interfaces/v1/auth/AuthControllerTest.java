/*
 * File: AuthControllerTest.java
 * Purpose: Happy path tests for authentication endpoints including user
 * registration, login, token refresh and logout. Validates successful
 * operations return correct responses and tokens using constants from
 * AuthTestConstants for consistent test data. All Rights Reserved. Arodi
 * Emmanuel
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
class AuthControllerTest {
  @Autowired MockMvc mvc;

  @Test
  @DisplayName("register user -> 200 with complete token response")
  void register_returns_tokens() throws Exception {
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format(
                "{\"user\":{\"username\":\"%s\",\"email\":\"%s\",\"password\":\"%s\"}}",
                REGISTER_USERNAME, REGISTER_EMAIL, REGISTER_PASSWORD)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").isNotEmpty())
        .andExpect(jsonPath("$.refreshToken").isNotEmpty())
        .andExpect(jsonPath("$.expiresIn").isNumber())
        .andExpect(jsonPath("$.username").value(REGISTER_USERNAME));
  }

  @Test
  @DisplayName("login with valid credentials -> 200 with access and refresh tokens")
  void login_returns_tokens() throws Exception {
    // First register the user
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format(
                "{\"user\":{\"username\":\"%s\",\"email\":\"%s\",\"password\":\"%s\"}}",
                LOGIN_USERNAME, LOGIN_EMAIL, LOGIN_PASSWORD)))
        .andExpect(status().isOk());

    // Then login
    mvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format(
                "{\"username\":\"%s\",\"password\":\"%s\"}",
                LOGIN_USERNAME, LOGIN_PASSWORD)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").isNotEmpty())
        .andExpect(jsonPath("$.refreshToken").isNotEmpty())
        .andExpect(jsonPath("$.expiresIn").isNumber())
        .andExpect(jsonPath("$.username").value(LOGIN_USERNAME));
  }
}
