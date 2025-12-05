/*
 * File: AuthErrorMappingTest.java
 * Purpose: Core error mapping tests for invalid credentials and duplicate users.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth.register;

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
class AuthErrorMappingTest {
  @Autowired MockMvc mvc;

  @Test
  @DisplayName("401 auth.invalid_credentials for wrong password")
  void invalid_credentials_error() throws Exception {
    // First register a user
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"user\":{\"username\":\"errtest\"," +
                "\"email\":\"err@test.com\",\"password\":\"StrongPass1!X\"}}"))
        .andExpect(status().isOk());

    // Try login with wrong password
    mvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"username\":\"errtest\",\"password\":\"wrongpassword\"}"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.code").value("auth.invalid_credentials"));
  }

  @Test
  @DisplayName("409 auth.duplicate_user for duplicate email registration")
  void user_exists_error() throws Exception {
    // Register first user
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"user\":{\"username\":\"user1\"," +
                "\"email\":\"dup@test.com\",\"password\":\"StrongPass1!X\"}}"))
        .andExpect(status().isOk());

    // Try to register with same email
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"user\":{\"username\":\"user2\"," +
                "\"email\":\"dup@test.com\",\"password\":\"StrongPass2!X\"}}"))
        .andExpect(status().isConflict())
        .andExpect(jsonPath("$.code").value("auth.duplicate_user"));
  }
}
