/*
 * File: AuthPasswordPolicyTest.java
 * Purpose: Validates password policy violations during registration
 * produce 400 with stable problem code and do not create user.
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
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthPasswordPolicyTest {
  @Autowired MockMvc mvc;

  @Test
  @DisplayName("too short password -> 400 auth.password_policy")
  void short_password() throws Exception {
    mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"user\":{\"username\":\"pwuser\","+
                "\"email\":\"pwuser@test.com\",\"password\":\"short\"}}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.code").value("auth.password_policy"));
  }
}
