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
  FontDto.CreateFontRequest req = new FontDto.CreateFontRequest(
    "body",
    "Body",
    "https://f/1.woff2",
    List.of(400),
    "h",
    true,
    null);
  ResponseEntity<FontDto.FontResponse> c = rest.postForEntity(
    "/api/v1/fonts",
    req,
    FontDto.FontResponse.class);
    assertThat(c.getStatusCode()).isEqualTo(HttpStatus.CREATED);
  ResponseEntity<FontDto.FontResponse> g = rest.getForEntity(
    "/api/v1/fonts/body",
    FontDto.FontResponse.class);
    assertThat(g.getStatusCode()).isEqualTo(HttpStatus.OK);
  FontDto.FontResponse body = java.util.Objects.requireNonNull(g.getBody());
  assertThat(body.label()).isEqualTo("Body");
  }
}