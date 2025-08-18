/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.interfaces.v1.user;

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
class UserControllerTest {
  @Autowired MockMvc mvc;

  @Test
  void crud_flow() throws Exception {
    String body =
        "{\"firstName\":\"A\",\"lastName\":\"B\",\"email\":\"a@b.com\",\"username\":\"ab-1\",\"password\":\"secret\"}";
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
    mvc.perform(get("/api/v1/users")).andExpect(status().isOk());
    String up =
        "{\"firstName\":\"A2\",\"lastName\":\"B2\",\"email\":\"a2@b.com\",\"roles\":[\"USER\"],\"active\":true}";
    mvc.perform(
            put("/api/v1/users/" + id)
                .header("If-Match", etag)
                .contentType(MediaType.APPLICATION_JSON)
                .content(up))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.firstName").value("A2"));
    var get2 =
        mvc.perform(get("/api/v1/users/" + id))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse();
    String etag2 = get2.getHeader("ETag");
    mvc.perform(delete("/api/v1/users/" + id).header("If-Match", etag2))
        .andExpect(status().isNoContent());
  }
}
