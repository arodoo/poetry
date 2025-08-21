/*
 * File: ETagAndIfMatchTest.java
 * Purpose: Integration tests for ETag and If-Match semantics to ensure
 * optimistic concurrency and cache validation work as expected. Tests
 * simulate request flows and verify server-side ETag handling.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.http;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ETagAndIfMatchTest {
  @Autowired MockMvc mvc;

  @Test
  void etag_on_get_and_if_match_required_and_checked() throws Exception {
    String resp =
        mvc.perform(
                post("/api/v1/users")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"firstName\":\"A\",\"lastName\":\"B\"," +
                        "\"email\":\"a@b.com\",\"username\":\"ab\"," +
                        "\"password\":\"secret\"}"))
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

    String id = resp.replaceAll(".*\\\"id\\\":(\\d+).*", "$1");

    String etag =
        mvc.perform(get("/api/v1/users/" + id))
            .andExpect(status().isOk())
            .andReturn().getResponse().getHeader("ETag");

    String updateBody = "{\"firstName\":\"A2\",\"lastName\":\"B2\"," +
        "\"email\":\"a2@b.com\",\"roles\":[\"USER\"],\"active\":true}";

    mvc.perform(
            put("/api/v1/users/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateBody))
        .andExpect(status().isPreconditionRequired());

    mvc.perform(
            put("/api/v1/users/" + id)
                .header("If-Match", "\"bad\"")
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateBody))
        .andExpect(status().isPreconditionFailed());

    String etag2 =
        mvc.perform(
                put("/api/v1/users/" + id)
                    .header("If-Match", etag)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(updateBody))
            .andExpect(status().isOk())
            .andReturn().getResponse().getHeader("ETag");

    mvc.perform(delete("/api/v1/users/" + id))
        .andExpect(status().isPreconditionRequired());

    mvc.perform(delete("/api/v1/users/" + id).header("If-Match", etag2))
        .andExpect(status().isNoContent());
  }
}
