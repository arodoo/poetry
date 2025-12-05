/*
 * File: AuthLogoutTest.java
 * Purpose: Verifies logout revokes refresh token causing subsequent refresh
 * attempts to fail (401) while remaining idempotent on repeated logout
 * calls with the same token. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth.login;

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
import org.springframework.test.web.servlet.MvcResult;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthLogoutTest {
  @Autowired MockMvc mvc;

  @Test
  @DisplayName("logout revokes refresh and is idempotent")
  void logout_revokes_and_idempotent() throws Exception {
    MvcResult reg = mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"user\":{\"username\":\"lout\","+
                "\"email\":\"lout@test.com\",\"password\":\"StrongPass1!X\"}}"))
        .andExpect(status().isOk()).andReturn();
    String body = reg.getResponse().getContentAsString();
    String refresh = body.split("\"refreshToken\":\"")[1].split("\"")[0];

    mvc.perform(post("/api/v1/auth/logout")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"refreshToken\":\""+refresh+"\"}"))
        .andExpect(status().isNoContent());

    mvc.perform(post("/api/v1/auth/refresh")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"refreshToken\":\""+refresh+"\"}"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.code").value("auth.invalid_refresh_token"));

    mvc.perform(post("/api/v1/auth/logout")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"refreshToken\":\""+refresh+"\"}"))
        .andExpect(status().isNoContent());
  }
}
