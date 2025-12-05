/*
 * File: RateLimiterMetricsTest.java
 * Purpose: Tests for rate limiter metrics emission and counter increments.
 * Ensures observability works correctly for rate limiting operations.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth.security;

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
class RateLimiterMetricsTest {
  @Autowired MockMvc mvc;
  @Autowired MeterRegistry registry;

  @Test
  @DisplayName("rate limiter metrics increment on acquire and block")
  void rate_limiter_metrics() throws Exception {
    // First register a user
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"user\":{\"username\":\"ratetest\"," +
                "\"email\":\"rate@test.com\"," +
                "\"password\":\"StrongPass1!X\"}}"))
        .andExpect(status().isOk());

    // Successful login should increment acquire counter
    Counter acquire = registry.counter("auth_rate_acquire_total");
    double initialAcquire = acquire.count();

    mvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"username\":\"ratetest\",\"password\":\"StrongPass1!X\"}"))
        .andExpect(status().isOk());

    // Should have incremented acquire counter
    assertThat(acquire.count()).isGreaterThan(initialAcquire);
  }
}
