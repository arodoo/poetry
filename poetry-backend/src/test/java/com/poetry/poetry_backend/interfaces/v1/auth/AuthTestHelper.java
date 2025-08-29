/*
 * File: AuthTestHelper.java
 * Purpose: Helper utilities for authentication-related tests to reduce
 * code duplication and ensure consistent test patterns across auth test
 * cases. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

public final class AuthTestHelper {

  private AuthTestHelper() {
    // Utility class
  }

  public static ResultActions performLoginRequest(
      MockMvc mockMvc,
      String username,
      String password) throws Exception {
    return mockMvc.perform(post("/api/v1/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(String.format(
            "{\"username\":\"%s\",\"password\":\"%s\"}",
            username, password)));
  }
}
