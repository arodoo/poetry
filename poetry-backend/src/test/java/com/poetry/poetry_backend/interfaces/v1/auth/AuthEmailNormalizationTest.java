/*
 * File: AuthEmailNormalizationTest.java
 * Purpose: Ensures registration normalizes email casing and provider
 * specific plus/dot modifiers so stored email is canonical.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthEmailNormalizationTest {
  @Autowired MockMvc mvc;
  @Autowired ObjectMapper mapper;

  @Test
  @DisplayName("mixed case and plus tag email normalized on register")
  void email_normalized() throws Exception {
    MvcResult res = mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"user\":{\"username\":\"emuser\","+
                "\"email\":\"User.Name+tag@GMAIL.com\",\"password\":\"StrongPass1!X\"}}"))
        .andExpect(status().isOk()).andReturn();
    String email = mapper.readTree(res.getResponse().getContentAsString())
        .get("email").asText();
    assertThat(email).isEqualTo("username@gmail.com");
  }
}
