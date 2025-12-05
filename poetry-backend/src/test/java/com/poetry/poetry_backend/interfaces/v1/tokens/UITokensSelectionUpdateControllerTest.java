/*
 * File: UITokensSelectionUpdateControllerTest.java
 * Purpose: Integration test for PUT /api/v1/tokens/selection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UpdateSelectionRequest;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UITokensSelectionUpdateControllerTest {
  @Autowired
  private TestRestTemplate rest;
  @Autowired
  private ThemeCommandPort themeCmd;

  @Test
  void updatesSelection() {
    Theme t = themeCmd.save(Theme.createNew("upd-key", "Upd Key", Map.of("p", "#111111")));
    UpdateSelectionRequest req = new UpdateSelectionRequest(
        t.getKey(), "Inter", "default", "default", "default", "default");
    ResponseEntity<Void> putResp = rest.exchange("/api/v1/tokens/selection",
        HttpMethod.PUT, new HttpEntity<>(req, new HttpHeaders()), Void.class);
    assertThat(putResp.getStatusCode().is2xxSuccessful()).isTrue();
    UITokensDto tokens = rest.getForObject("/api/v1/tokens", UITokensDto.class);
    assertThat(tokens).isNotNull();
    assertThat(tokens.current.theme).isEqualTo(t.getKey());
  }
}
