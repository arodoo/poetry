/*
 * File: AdminBootstrapLoginTest.java
 * Purpose: Verifies that the admin bootstrap user can successfully login
 * end-to-end after application context startup (bootstrap registration + login).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(properties = {
    "admin.bootstrap.username=admin",
    "admin.bootstrap.email=admin@example.com",
    "admin.bootstrap.password=ChangeMe123!"
})
@AutoConfigureMockMvc
class AdminBootstrapLoginTest {
  @Autowired MockMvc mvc;

  @Test
  @DisplayName("bootstrap admin can login with configured credentials -> 200 tokens")
  void admin_can_login() throws Exception {
    mvc.perform(post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
            .content("{\"username\":\"admin\",\"password\":\"ChangeMe123!\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").isNotEmpty())
        .andExpect(jsonPath("$.refreshToken").isNotEmpty())
        .andExpect(jsonPath("$.username").value("admin"));
  }
}
