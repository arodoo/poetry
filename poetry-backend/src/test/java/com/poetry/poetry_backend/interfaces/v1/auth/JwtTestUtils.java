/*
 * File: JwtTestUtils.java
 * Purpose: Utility class for JWT token testing operations including
 * token extraction from HTTP responses, JWT payload decoding and claims
 * validation. Centralizes JWT-specific test logic to support advanced
 * authentication test scenarios. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Base64;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public final class JwtTestUtils {
  // Prevent instantiation of utility class
  private JwtTestUtils() {}

  private static final String STRONG = "StrongPass1!X";

  public static MvcResult performLogin(MockMvc mvc, String username, String password) 
      throws Exception {
    // First register user (ignore provided password; use strong to satisfy policy)
    mvc.perform(post("/api/v1/auth/register")
        .contentType(MediaType.APPLICATION_JSON)
        .content(String.format(
            "{\"user\":{\"username\":\"%s\",\"email\":\"%s@test.com\",\"password\":\"%s\"}}", 
            username, username, STRONG)))
        .andExpect(status().isOk());
    
    // Then login (use strong password)
    return mvc.perform(post("/api/v1/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content(String.format(
            "{\"username\":\"%s\",\"password\":\"%s\"}", 
            username, STRONG)))
        .andExpect(status().isOk())
        .andReturn();
  }

  public static String extractAccessToken(ObjectMapper objectMapper, MvcResult result) 
      throws Exception {
    String responseBody = result.getResponse().getContentAsString();
    JsonNode response = objectMapper.readTree(responseBody);
    return response.get("accessToken").asText();
  }

  public static JsonNode decodeJwtPayload(ObjectMapper objectMapper, String jwt) 
      throws Exception {
    String[] parts = jwt.split("\\.");
    if (parts.length != 3) {
      throw new IllegalArgumentException("Invalid JWT format");
    }
    
    String payload = parts[1];
    // Add padding if needed for Base64 decoding
    while (payload.length() % 4 != 0) {
      payload += "=";
    }
    
    byte[] decoded = Base64.getUrlDecoder().decode(payload);
    return objectMapper.readTree(decoded);
  }
}
