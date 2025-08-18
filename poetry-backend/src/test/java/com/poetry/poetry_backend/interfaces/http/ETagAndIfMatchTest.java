/*
 Integration tests that verify strong ETag generation and If‑Match
 enforcement. The flow covers creating a user, reading the ETag, and
 updating or deleting with and without correct preconditions. It also
 asserts idempotency key conflicts return 409. All Rights Reserved.
 Arodi Emmanuel
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
    String body =
        "{\"firstName\":\"A\",\"lastName\":\"B\",\"email\":\"a@b.com\",\"username\":\"ab\",\"password\":\"secret\"}";
    String resp =
        mvc.perform(post("/api/v1/users").contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();
    String id = resp.replaceAll(".*\\\"id\\\":(\\d+).*", "$1");
    var getRes =
        mvc.perform(get("/api/v1/users/" + id))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse();
    String etag = getRes.getHeader("ETag");
    mvc.perform(
            put("/api/v1/users/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"firstName\":\"A2\",\"lastName\":\"B2\",\"email\":\"a2@b.com\",\"roles\":[\"USER\"],\"active\":true}"))
        .andExpect(status().isPreconditionRequired());
    mvc.perform(
            put("/api/v1/users/" + id)
                .header("If-Match", "\"bad\"")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"firstName\":\"A2\",\"lastName\":\"B2\",\"email\":\"a2@b.com\",\"roles\":[\"USER\"],\"active\":true}"))
        .andExpect(status().isPreconditionFailed());
    var putRes =
        mvc.perform(
                put("/api/v1/users/" + id)
                    .header("If-Match", etag)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                        "{\"firstName\":\"A2\",\"lastName\":\"B2\",\"email\":\"a2@b.com\",\"roles\":[\"USER\"],\"active\":true}"))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse();
    String etag2 = putRes.getHeader("ETag");
    mvc.perform(delete("/api/v1/users/" + id)).andExpect(status().isPreconditionRequired());
    mvc.perform(delete("/api/v1/users/" + id).header("If-Match", etag2))
        .andExpect(status().isNoContent());
  }

  @Test
  void idempotency_key_conflict_on_duplicate() throws Exception {
    String key = "k1";
    String body =
        "{\"firstName\":\"A\",\"lastName\":\"B\",\"email\":\"a@b.com\",\"username\":\"ac\",\"password\":\"secret\"}";
    mvc.perform(
            post("/api/v1/users")
                .header("Idempotency-Key", key)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
        .andExpect(status().isOk());
    mvc.perform(
            post("/api/v1/users")
                .header("Idempotency-Key", key)
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
        .andExpect(status().isConflict());
  }
}
