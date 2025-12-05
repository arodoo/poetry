/*
 * File: AuthRateLockoutTest.java
 * Purpose: Tests rate limiter penalties, lockout escalation, and
 * idempotent registration replay plus key rotation overlap edges.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.auth.security;

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
import org.springframework.test.web.servlet.ResultActions;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthRateLockoutTest {
    @Autowired MockMvc mvc;

    private ResultActions login(String u, String p) throws Exception {
        return mvc.perform(post("/api/v1/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{" + "\"username\":\""+u+"\"," +"\"password\":\""+p+"\"}"));
    }

    @Test @DisplayName("account lockout after threshold failures returns 423")
    void lockout_after_failures() throws Exception {
        mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{"+"\"user\":{\"username\":\"u1\","+
                "\"email\":\"u1@test.com\","+
                "\"password\":\"StrongPass1!X\"}}"))
            .andExpect(status().isOk());
        for (int i=0;i<6;i++) login("u1","bad").andExpect(status().is4xxClientError());
        login("u1","StrongPass1!X").andExpect(status().isLocked());
    }

    @Test @DisplayName("idempotent registration replay returns same response (200)")
    void register_idempotent_replay() throws Exception {
        String body = "{"+"\"user\":{\"username\":\"idem\","+
            "\"email\":\"idem@test.com\","+
            "\"password\":\"StrongPass1!X\"}}";
        String key = "Key-123";
        var first = mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Idempotency-Key", key)
            .content(body)).andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();
        var second = mvc.perform(post("/api/v1/auth/register")
            .contentType(MediaType.APPLICATION_JSON)
            .header("Idempotency-Key", key)
            .content(body)).andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();
        assertThat(second).isEqualTo(first);
    }
}
