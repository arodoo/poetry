/*
 * File: ETagTestFlow.java
 * Purpose: Encapsulates the request flow used by ETagAndIfMatchTest to keep
 * the test file concise and under line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.http;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

class ETagTestFlow {
  static String createAndGetId(MockMvc mvc, String body) throws Exception {
    String resp = mvc.perform(post("/api/v1/users")
        .contentType(MediaType.APPLICATION_JSON)
        .content(body))
        .andExpect(status().isOk())
        .andReturn().getResponse().getContentAsString();
    return resp.replaceAll(".*\\\"id\\\":(\\d+).*", "$1");
  }
}
