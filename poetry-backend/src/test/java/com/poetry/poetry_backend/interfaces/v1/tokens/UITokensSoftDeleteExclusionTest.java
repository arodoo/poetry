/*
 * File: UITokensSoftDeleteExclusionTest.java
 * Purpose: Ensure soft-deleted themes are excluded from /api/v1/tokens response.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.interfaces.v1.tokens.dto.UITokensDto;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UITokensSoftDeleteExclusionTest {
  @Autowired private ThemeCommandPort command;
  @Autowired private TestRestTemplate rest;

  @Test
  void softDeletedThemeNotPresent() {
    Theme t = Theme.createNew("temp-test","Temp Test", Map.of("p","#123456"));
    t = command.save(t.withActivated(false));
    command.deleteSoft(t.getId());
    ResponseEntity<UITokensDto> resp = rest.getForEntity("/api/v1/tokens", UITokensDto.class);
    assertThat(resp.getStatusCode().is2xxSuccessful()).isTrue();
    UITokensDto body = resp.getBody();
    assertThat(body != null && body.themes != null).isTrue();
    if (body != null && body.themes != null) {
      assertThat(body.themes).noneMatch(th -> "temp-test".equals(th.key));
    }
  }
}
