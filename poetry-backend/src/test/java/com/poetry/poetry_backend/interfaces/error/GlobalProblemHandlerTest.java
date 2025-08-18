/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.interfaces.error;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.*;

@SpringBootTest
@AutoConfigureMockMvc
@Import(GlobalProblemHandlerTest.DemoController.class)
class GlobalProblemHandlerTest {
  @Autowired MockMvc mvc;

  @RestController
  @RequestMapping("/test/validation")
  static class DemoController {
    record Payload(String name) {}

    @PostMapping
    void create(@RequestBody Payload p) {
      throw new IllegalArgumentException("bad");
    }
  }

  @Test
  void shouldReturnProblemDetail() throws Exception {
    mvc.perform(
            post("/test/validation")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":1}"))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.title").exists())
        .andExpect(jsonPath("$.type").value("https://datatracker.ietf.org/doc/html/rfc7807"));
  }
}
