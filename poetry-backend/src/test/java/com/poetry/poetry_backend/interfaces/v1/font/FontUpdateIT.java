/*
 * File: FontUpdateIT.java
 * Purpose: Update existing font.
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
class FontUpdateIT {
  @Autowired
  TestRestTemplate rest;
  @Test
  void updateFont() {
  FontDtos.CreateFontRequest req = new FontDtos.CreateFontRequest(
    "ui",
    "UI",
    "https://f/u.woff2",
    List.of(300),
    "hh",
    false,
    null);
  rest.postForEntity("/api/v1/fonts", req, FontDtos.FontResponse.class);
  FontDtos.UpdateFontRequest upd = new FontDtos.UpdateFontRequest(
    "UI2",
    "https://f/u2.woff2",
    List.of(300,700),
    true,
    true,
    null);
  rest.put("/api/v1/fonts/ui", upd);
  var resp = rest.getForEntity(
    "/api/v1/fonts/ui",
    FontDtos.FontResponse.class);
    assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
  FontDtos.FontResponse g = java.util.Objects.requireNonNull(resp.getBody());
  assertThat(g.label()).isEqualTo("UI2");
  assertThat(g.weights()).containsExactly(300,700);
  }
}