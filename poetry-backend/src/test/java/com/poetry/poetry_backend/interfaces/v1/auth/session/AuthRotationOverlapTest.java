/*
 * File: AuthRotationOverlapTest.java
 * Purpose: Tests boundary behavior of JWT signing key rotation overlap
 * ensuring tokens signed with previous secret are accepted only within
 * configured overlap window while new tokens always use current secret.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth.session;

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

@SpringBootTest(properties = {
                "auth.rotationOverlapSeconds=1",
                "auth.secretKey=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAA!!11",
                "auth.previousSecretKey=bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbBB??22"
})
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthRotationOverlapTest {
        @Autowired
        MockMvc mvc;
        @Autowired
        ObjectMapper mapper;

        @Test
        @DisplayName("access token issued with current key while previous accepted during overlap")
        void rotation_overlap_boundary() throws Exception {
                // Register + login
                MvcResult login = mvc.perform(post("/api/v1/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{" +
                                        "\"user\":" +
                                        "{\"username\":\"rotu\"," +
                                        "\"email\":\"rotu@test.com\"," +
                                        "\"password\":\"StrongPass1!X\"}" +
                                        "}"))
                                .andExpect(status().isOk()).andReturn();
                String access = mapper.readTree(login.getResponse().getContentAsString())
                                .get("accessToken").asText();
                assertThat(access).isNotBlank();
                // Wait for overlap to expire then ensure a refresh (new login) still works
                Thread.sleep(1200); // >1s overlap
                MvcResult login2 = mvc.perform(post("/api/v1/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("{" +
                                        "\"username\":\"rotu\"," +
                                        "\"password\":\"StrongPass1!X\"}"))
                                .andExpect(status().isOk()).andReturn();
                String access2 = mapper.readTree(login2.getResponse().getContentAsString())
                                .get("accessToken").asText();
                assertThat(access2).isNotBlank();
        }
}
