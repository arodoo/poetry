/*
 * File: IdempotencyKeyTest.java
 * Purpose: Tests idempotency key handling to ensure operations are
 * safely retried or deduplicated according to contract expectations.
 * These tests validate server behavior for repeated requests.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.http;

import static com.poetry.poetry_backend.interfaces.v1.user.UserTestConstants.*;
import static com.poetry.poetry_backend.interfaces.v1.user.UserTestJson.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class IdempotencyKeyTest {
  @Autowired MockMvc mvc;

  @Test
  void idempotency_key_conflict_on_duplicate() throws Exception {
    String key = "k1";
  String body = createUserJson(
    IDEMPOTENCY_FIRST_NAME,
    IDEMPOTENCY_LAST_NAME,
    IDEMPOTENCY_EMAIL,
    IDEMPOTENCY_USERNAME,
    IDEMPOTENCY_PASSWORD,
    "admin");

    mvc.perform(
            post("/api/v1/users")
                .header("Idempotency-Key", key)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
        .andExpect(status().isOk());

    mvc.perform(
            post("/api/v1/users")
                .header("Idempotency-Key", key)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
        .andExpect(status().isConflict());
  }
}
