/*
 * File: FontDeleteIT.java
 * Purpose: Delete existing font.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class FontDeleteIT {
  @Autowired
  TestRestTemplate rest;
  @Test
  void deleteFont() {
  FontDto.CreateFontRequest req = new FontDto.CreateFontRequest(
    "serif",
    "Serif",
    "https://f/s.woff2",
    List.of(400),
    "x",
    false,
    null);
  rest.postForEntity("/api/v1/fonts", req, FontDto.FontResponse.class);
  rest.delete("/api/v1/fonts/serif");
  var resp = rest.getForEntity(
  "/api/v1/fonts",
  FontDto.FontResponse[].class);
    assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
    var list = resp.getBody();
    assertThat(list).isNotNull();
    assertThat(List.of(list)).isEmpty();
  }
}