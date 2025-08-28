/*
 * File: AuthRefreshErrorTest.java
 * Purpose: Tests refresh token error scenarios including revoked tokens.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

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
class AuthRefreshErrorTest {
  @Autowired MockMvc mvc;

  @Test
  @DisplayName("401 auth.invalid_refresh_token for revoked refresh")
  void invalid_refresh_token_error() throws Exception {
    // Register and login to get tokens
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"user\":{\"username\":\"refresh\"," +
                "\"email\":\"refresh@test.com\",\"password\":\"StrongPass1!X\"}}"))
        .andExpect(status().isOk());

    var loginResult = mvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"username\":\"refresh\",\"password\":\"StrongPass1!X\"}"))
        .andExpect(status().isOk())
        .andReturn();

    String responseBody = loginResult.getResponse().getContentAsString();
    String refreshToken = responseBody.split("\"refreshToken\":\"")[1].split("\"")[0];

    // Logout to revoke refresh token
    mvc.perform(post("/api/v1/auth/logout")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"refreshToken\":\"" + refreshToken + "\"}"))
        .andExpect(status().isNoContent());

    // Try to use revoked refresh token
    mvc.perform(post("/api/v1/auth/refresh")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"refreshToken\":\"" + refreshToken + "\"}"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.code").value("auth.invalid_refresh_token"));
  }
}
