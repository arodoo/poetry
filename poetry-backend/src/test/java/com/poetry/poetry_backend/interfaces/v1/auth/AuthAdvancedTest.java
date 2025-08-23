/*
 * File: AuthAdvancedTest.java
 * Purpose: Advanced authentication tests covering JWT claim validation,
 * refresh token rotation chain integrity, misuse detection and audit
 * event sequencing. Validates security behaviors and token lifecycle
 * management beyond basic happy/sad path scenarios. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import static com.poetry.poetry_backend.interfaces.v1.auth.AuthTestConstants.*;
import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poetry.poetry_backend.infrastructure.jpa.auth.RefreshTokenRepository;
import com.poetry.poetry_backend.infrastructure.memory.auth.InMemoryAuditLogger;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthAdvancedTest {
  @Autowired MockMvc mvc;
  @Autowired ObjectMapper objectMapper;
  @Autowired RefreshTokenRepository refreshRepo;
  @Autowired InMemoryAuditLogger auditLogger;

  @Test
  @DisplayName("JWT claims validation: iss, sub, exp, jti uniqueness")
  void jwt_claims_validation() throws Exception {
    // Register and login to get tokens
    MvcResult result1 = JwtTestUtils.performLogin(mvc, JWT_USER1, JWT_PASSWORD);
    String accessToken1 = JwtTestUtils.extractAccessToken(objectMapper, result1);
    
    MvcResult result2 = JwtTestUtils.performLogin(mvc, JWT_USER2, JWT_PASSWORD);
    String accessToken2 = JwtTestUtils.extractAccessToken(objectMapper, result2);
    
    // Decode JWT claims (header.payload.signature)
    JsonNode claims1 = JwtTestUtils.decodeJwtPayload(objectMapper, accessToken1);
    JsonNode claims2 = JwtTestUtils.decodeJwtPayload(objectMapper, accessToken2);
    
    // Validate required claims exist
    assertThat(claims1.has("iss")).isTrue();
    assertThat(claims1.has("sub")).isTrue();
    assertThat(claims1.has("exp")).isTrue();
    assertThat(claims1.has("jti")).isTrue();
    
    // Validate claim values
    assertThat(claims1.get("iss").asText()).isEqualTo(TEST_ISSUER);
    assertThat(claims1.get("sub").asText()).isEqualTo(JWT_USER1);
    assertThat(claims2.get("sub").asText()).isEqualTo(JWT_USER2);
    
    // JTI should be unique across tokens
    assertThat(claims1.get("jti").asText())
        .isNotEqualTo(claims2.get("jti").asText());
    
    // Expiry should be reasonable (within next hour)
    long exp1 = claims1.get("exp").asLong();
    long now = System.currentTimeMillis() / 1000;
    assertThat(exp1).isBetween(now, now + 3600);
  }
}
