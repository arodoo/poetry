/*
 * File: I18nControllerTest.java
 * Purpose: Basic web slice test for locales endpoint. This test class
 * verifies the I18nController's endpoints for listing supported locales.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.i18n;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.application.i18n.usecase.GetSupportedLocalesUseCase;
import com.poetry.poetry_backend.application.i18n.usecase.ResolveMessageUseCase;

class I18nControllerTest {
  @Test
  void returnsLocales() {
    I18nQueryPort port = new I18nQueryPort() {
      public String defaultLocale() { return "en"; }
      public java.util.List<String> supportedLocales() { return java.util.List.of("en", "es"); }
      public String resolve(String k, String l) { return k; }
    };
    var c = new I18nController(
        new GetSupportedLocalesUseCase(port),
        new ResolveMessageUseCase(port));
    var response = c.locales();
    var body = response.getBody();
    assertNotNull(body);
    assertEquals(List.of("en", "es"), body.locales());
  }
}
