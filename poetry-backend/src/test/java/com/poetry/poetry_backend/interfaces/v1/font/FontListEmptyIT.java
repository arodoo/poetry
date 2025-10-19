/*
 * File: FontListEmptyIT.java
 * Purpose: Verify empty list initially.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class FontListEmptyIT {
  @Autowired
  TestRestTemplate rest;
  @Test
  void emptyList() {
  ResponseEntity<FontDto.FontResponse[]> r = rest.getForEntity(
    "/api/v1/fonts",
    FontDto.FontResponse[].class);
    assertThat(r.getStatusCode().is2xxSuccessful()).isTrue();
    assertThat(List.of(r.getBody())).isEmpty();
  }
}