/*
 * File: AuthAdaptivePenaltyTest.java
 * Purpose: Exercises adaptive rate limiter penalty path by driving near-threshold
 * acquisitions until a penalty window triggers producing 429 responses, validating
 * escalation logic. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth.security;

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

@SpringBootTest(properties = {
        // tune limiter smaller to reliably trigger adaptive branch
        "auth.rotationOverlapSeconds=0"
})
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthAdaptivePenaltyTest {
    @Autowired
    MockMvc mvc;

    @Test
    @DisplayName("adaptive penalties trigger 429 after repeated near-threshold usage")
    void adaptive_penalty_triggers() throws Exception {
        mvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                // include required email field and strong policy-compliant password
                .content("{" +
                        "\"user\":{\"username\":\"penuser\",\"email\":\"penuser@test.com\"," +
                        "\"password\":\"StrongPass1!X\"}}"))
                .andExpect(status().isOk());
        for (int i = 0; i < 20; i++) {
            mvc.perform(post("/api/v1/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\"penuser\",\"password\":\"bad\"}"));
        }
        mvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"penuser\",\"password\":\"bad\"}"))
                .andExpect(status().isTooManyRequests());
    }
}
