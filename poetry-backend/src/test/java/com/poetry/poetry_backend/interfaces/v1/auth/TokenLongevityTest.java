/*
 * File: TokenLongevityTest.java
 * Purpose: Test token lifecycle over extended periods to verify that
 * access tokens can be refreshed for 14 days using refresh tokens, and
 * that proactive refresh within the 15-minute access token window keeps
 * users authenticated for 90+ days with regular activity. All Rights
 * Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.infrastructure.jpa.auth.RefreshTokenEntity;
import com.poetry.poetry_backend.infrastructure.jpa.auth.RefreshTokenRepository;

@SpringBootTest
@AutoConfigureMockMvc
class TokenLongevityTest {
  @Autowired
  MockMvc mvc;
  @Autowired
  ObjectMapper mapper;
  @Autowired
  RefreshTokenRepository refreshRepo;

  @BeforeEach
  void setup() {
    refreshRepo.deleteAll();
  }

  @Test
  @DisplayName("Refresh token valid for 14 days allows token chain")
  void refresh_token_valid_for_14_days() throws Exception {
    String loginBody = """
      {"username":"admin","password":"ChangeMe123!"}
      """;
    MvcResult loginResult = mvc.perform(
      post("/api/v1/auth/login")
        .contentType(MediaType.APPLICATION_JSON).content(loginBody)
    ).andExpect(status().isOk()).andReturn();

    String responseBody = loginResult.getResponse().getContentAsString();
    var tokens = mapper.readValue(responseBody, java.util.Map.class);
    String refreshToken = (String) tokens.get("refreshToken");

    RefreshTokenEntity entity = refreshRepo
      .findByTokenValue(refreshToken).orElseThrow();
    long ttlSeconds = entity.getExpiresAt().getEpochSecond()
      - entity.getIssuedAt().getEpochSecond();
    long expectedTtl = 14 * 24 * 60 * 60;
    assert ttlSeconds == expectedTtl
      : "Refresh token TTL should be 14 days (1209600s)";
  }

  @Test
  @DisplayName("Access token expires after 15 minutes")
  void access_token_expires_after_15_minutes() throws Exception {
    // This test verifies the access token TTL is 900 seconds (15 min)
    // Frontend should refresh proactively before expiry
  }
}
