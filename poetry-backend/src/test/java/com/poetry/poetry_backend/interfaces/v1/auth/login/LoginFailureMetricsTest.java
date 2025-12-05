/*
 * File: LoginFailureMetricsTest.java
 * Purpose: Tests for login failure metrics emission and counter increments.
 * Ensures observability works correctly for authentication failures.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth.login;

import static org.assertj.core.api.Assertions.assertThat;
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

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class LoginFailureMetricsTest {
  @Autowired MockMvc mvc;
  @Autowired MeterRegistry registry;

  @Test
  @DisplayName("login failure metrics increment on invalid credentials")
  void login_failure_metrics() throws Exception {
    // Register a user first
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"user\":{\"username\":\"failtest\"," +
                "\"email\":\"fail@test.com\"," +
                "\"password\":\"StrongPass1!X\"}}"))
        .andExpect(status().isOk());

    Counter failure = registry.counter("auth_login_failure_total");
    double initialFailures = failure.count();

    // Attempt login with wrong password (this should trigger the onFailure path)
    mvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"username\":\"failtest\",\"password\":\"wrongpassword\"}"))
        .andExpect(status().isUnauthorized());

    // Should have incremented failure counter
    assertThat(failure.count()).isGreaterThan(initialFailures);
  }
}
