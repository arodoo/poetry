/*
 * File: VersionedPlaceholderControllerTest.java
 * Purpose: Tests that health endpoint returns localized status field. This
 * test class ensures the VersionedPlaceholderController works correctly with
 * i18n integration.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;

class VersionedPlaceholderControllerTest {
  @Test
  void healthReturnsLocalizedStatus() {
    I18nQueryPort port = new I18nQueryPort() {
      public String defaultLocale() { return "en"; }
      public List<String> supportedLocales() { return List.of("en", "es"); }
      public String resolve(String k, String l) { return "common.ok".equals(k) ? "OK" : k; }
    };
    ResolveMessageUseCase use = new ResolveMessageUseCase(port);
    var c = new VersionedPlaceholderController(use);
    ResponseEntity<Map<String, Object>> res = c.health("es");
    assertEquals(200, res.getStatusCode().value());
    var body = res.getBody();
    assertNotNull(body);
    assertEquals("OK", body.get("status"));
    assertTrue(body.containsKey("timestamp"));
  }
}
