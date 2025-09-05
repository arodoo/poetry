/*
 * File: FontDeleteGet404IT.java
 * Purpose: Ensure deleted font is not retrievable (404).
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
class FontDeleteGet404IT {
  @Autowired
  TestRestTemplate rest;
  @Test
  void getAfterDeleteIs404() {
  FontDtos.CreateFontRequest req = new FontDtos.CreateFontRequest(
    "tmpfont",
    "Tmp Font",
    "https://f/tmp.woff2",
    List.of(400),
    "h1",
    false,
    null);
  rest.postForEntity(
    "/api/v1/fonts",
    req,
    FontDtos.FontResponse.class);
  rest.delete("/api/v1/fonts/tmpfont");
  ResponseEntity<FontDtos.FontResponse> g = rest.getForEntity(
    "/api/v1/fonts/tmpfont",
    FontDtos.FontResponse.class);
    assertThat(g.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
  }
}
