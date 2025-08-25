/*
 * File: AuthRefreshTest.java
 * Purpose: Tests for authentication token refresh functionality including
 * valid refresh token handling, new access token generation and refresh
 * token rotation. Ensures token lifecycle management works correctly
 * for session continuity scenarios. All Rights Reserved. Arodi Emmanuel
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
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthRefreshTest {
  @Autowired MockMvc mvc;
  @Autowired ObjectMapper objectMapper;

  @Test
  @DisplayName("refresh with valid token -> 200 with new access token")
  void refresh_returns_new_token() throws Exception {
    // Register and login to get initial tokens
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format(
                "{\"user\":{\"username\":\"%s\",\"email\":\"%s\",\"password\":\"%s\"}}",
                REFRESH_USERNAME, REFRESH_EMAIL, REFRESH_PASSWORD)))
        .andExpect(status().isOk());

    MvcResult loginResult = mvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format(
                "{\"username\":\"%s\",\"password\":\"%s\"}",
                REFRESH_USERNAME, REFRESH_PASSWORD)))
        .andExpect(status().isOk())
        .andReturn();

    // Extract refresh token
    String loginResponse = loginResult.getResponse().getContentAsString();
    JsonNode loginJson = objectMapper.readTree(loginResponse);
    String refreshToken = loginJson.get("refreshToken").asText();

    // Use refresh token to get new access token
    mvc.perform(post("/api/v1/auth/refresh")
            .contentType(MediaType.APPLICATION_JSON)
            .content(String.format("{\"refreshToken\":\"%s\"}", refreshToken)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").isNotEmpty())
        .andExpect(jsonPath("$.refreshToken").isNotEmpty());
  }
}
