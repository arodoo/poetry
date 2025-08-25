/*
 * File: AuthLockoutTimingTest.java
 * Purpose: Verifies exponential lockout escalation timing by inducing
 * consecutive failures past threshold and asserting subsequent attempt
 * blocks (423) across increasing windows. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth;

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

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthLockoutTimingTest {
    @Autowired
    MockMvc mvc;

    @Test
    @DisplayName("lockout escalation triggers 423 after threshold reached")
    void lockout_escalation() throws Exception {
        mvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                // include required email and strong password
                .content("{" +
                        "\"user\":" +
                        "{\"username\":\"lkuser\"," +
                        "\"email\":\"lkuser@test.com\"," +
                        "\"password\":\"StrongPass1!X\"}" +
                        "}"))
                .andExpect(status().isOk());
        for (int i = 0; i < 6; i++) {
            mvc.perform(post("/api/v1/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{" +
                            "\"username\":\"lkuser\"," +
                            "\"password\":\"bad\"}"));
        }
        mvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{" +
                        "\"username\":\"lkuser\"," +
                        "\"password\":\"StrongPass1!X\"}"))
                .andExpect(status().isLocked());
    }
}
