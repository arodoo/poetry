/*
 * File: AuthControllerTest.java
 * Purpose: Unit tests for the authentication controller verifying token
 * issuance, validation, and error paths. These tests ensure auth flows
 * remain stable and adhere to security expectations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.auth;

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
class AuthControllerTest {
  @Autowired MockMvc mvc;

  @Test
  void login_returns_token() throws Exception {
    mvc.perform(
            post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"john\",\"password\":\"doe\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").value("fake-jwt"))
        .andExpect(jsonPath("$.username").value("john"));
  }

  @Test
  void refresh_returns_new_token() throws Exception {
    mvc.perform(
            post("/api/v1/auth/refresh")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"refreshToken\":\"r1\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").value("fake-jwt-refreshed"));
  }

  @Test
  void logout_returns_no_content() throws Exception {
    mvc.perform(
            post("/api/v1/auth/logout")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"refreshToken\":\"r1\"}"))
        .andExpect(status().isNoContent());
  }

  @Test
  void register_returns_echo_stub() throws Exception {
    mvc.perform(
            post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"user\":{\"username\":\"john\"}}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.username").value("john"));
  }
}
