/*
 * File: VersionedPlaceholderControllerTest.java
 * Purpose: Tests that health endpoint returns localized status field. This
 * test class ensures the VersionedPlaceholderController works correctly with
 * i18n integration.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.api;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;
import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetAllThemesUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;

class VersionedPlaceholderControllerTest {
  @Test
  void healthReturnsLocalizedStatus() throws InterruptedException {
    I18nQueryPort i18nPort = new I18nQueryPort() {
      public String defaultLocale() { return "en"; }
      public List<String> supportedLocales() { return List.of("en", "es"); }
      public String resolve(String k, String l) { return "es".equals(l) ? "Aceptar" : "OK"; }
    };
    ThemeQueryPort themePort = new ThemeQueryPort() {
      public List<Theme> findAll() { return List.of(); }
      public java.util.Optional<Theme> findById(Long id) { return java.util.Optional.empty(); }
      public java.util.Optional<Theme> findByKey(String key) { return java.util.Optional.empty(); }
      public java.util.Optional<Theme> findActive() { return java.util.Optional.empty(); }
    };
    ResolveMessageUseCase resolveMessage = new ResolveMessageUseCase(i18nPort);
    GetAllThemesUseCase getAllThemes = new GetAllThemesUseCase(themePort);
    
    var controller = new VersionedPlaceholderController(resolveMessage, getAllThemes);
    ResponseEntity<Map<String, Object>> response;
    try {
      response = controller.health();
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    }
    
    assertEquals(200, response.getStatusCode().value());
    var body = response.getBody();
    assertNotNull(body);
    assertTrue(body.containsKey("status"));
    assertTrue(body.containsKey("timestamp"));
    assertTrue(body.containsKey("themesCount"));
    assertTrue(body.containsKey("activeThemeId"));
    assertTrue(body.containsKey("activeThemeName"));
  }
}
