/*
 * File: UITokensSelectionFallbackTest.java
 * Purpose: Ensures stored selection falls back when theme no longer exists.
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
import com.poetry.poetry_backend.application.theme.usecase.selection.SaveSystemSelectionUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;
import com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UITokensSelectionFallbackTest {
  @Autowired private ThemeCommandPort themeCmd;
  @Autowired private SaveSystemSelectionUseCase saveSel;
  @Autowired private TestRestTemplate rest;

  @Test
  void fallbackWhenStoredThemeMissing() {
    Theme t1 = themeCmd.save(Theme.createNew("one", "One", Map.of("p", "#111111")));
    Theme t2 = themeCmd.save(Theme.createNew("two", "Two", Map.of("p", "#222222")));
    saveSel.execute(
      new UiCustomizationSelection(
        t2.getKey(),
        "Inter",
        "default",
        "default",
        "default",
        "default"
      )
    );
    themeCmd.deleteSoft(t2.getId());
    ResponseEntity<UITokensDto> resp = rest.getForEntity(
      "/api/v1/tokens",
      UITokensDto.class);
    UITokensDto body = resp.getBody();
    boolean hasCurrent = body != null && body.current != null;
    assertThat(hasCurrent).isTrue();
    if (body != null && body.current != null) {
    // Fallback picks first available theme.
    // Seeder adds defaults before manual themes, order not guaranteed.
      assertThat(body.current.theme)
        .as("fallback to existing theme")
        .isIn(
          t1.getKey(),
          "a1",
          "amber"
        );
    }
  }
}
