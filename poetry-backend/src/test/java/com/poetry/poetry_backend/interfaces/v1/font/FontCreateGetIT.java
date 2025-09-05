/*
 * File: FontCreateGetIT.java
 * Purpose: Create then fetch font.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class FontCreateGetIT {
  @Autowired
  TestRestTemplate rest;
  @Test
  void createAndGet() {
  FontDtos.CreateFontRequest req = new FontDtos.CreateFontRequest(
    "body",
    "Body",
    "https://f/1.woff2",
    List.of(400),
    "h",
    true,
    null);
  ResponseEntity<FontDtos.FontResponse> c = rest.postForEntity(
    "/api/v1/fonts",
    req,
    FontDtos.FontResponse.class);
    assertThat(c.getStatusCode()).isEqualTo(HttpStatus.CREATED);
  ResponseEntity<FontDtos.FontResponse> g = rest.getForEntity(
    "/api/v1/fonts/body",
    FontDtos.FontResponse.class);
    assertThat(g.getStatusCode()).isEqualTo(HttpStatus.OK);
  FontDtos.FontResponse body = java.util.Objects.requireNonNull(g.getBody());
  assertThat(body.label()).isEqualTo("Body");
  }
}