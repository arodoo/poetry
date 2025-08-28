/*
 * File: AuthCorrelationIdTest.java
 * Purpose: Asserts Correlation-Id header is accepted, propagated and
 * generated when absent for auth requests. All Rights Reserved. Arodi
 * Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthCorrelationIdTest {
  @Autowired MockMvc mvc;

  @Test
  @DisplayName("provided correlation id echoed back")
  void provided_id_propagated() throws Exception {
    String cid = "cid-123";
    MvcResult res = mvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Correlation-Id", cid)
            .content("{\"username\":\"nouser\",\"password\":\"bad\"}"))
        .andReturn();
    assertThat(res.getResponse().getHeader("Correlation-Id")).isEqualTo(cid);
  }

  @Test
  @DisplayName("missing correlation id generated")
  void generated_when_missing() throws Exception {
    MvcResult res = mvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"username\":\"nouser\",\"password\":\"bad\"}"))
        .andReturn();
    String header = res.getResponse().getHeader("Correlation-Id");
    assertThat(header).isNotBlank();
  }
}
