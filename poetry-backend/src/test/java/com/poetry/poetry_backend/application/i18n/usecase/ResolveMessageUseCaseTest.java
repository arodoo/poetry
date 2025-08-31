/*
 * File: ResolveMessageUseCaseTest.java
 * Purpose: Tests message resolution use case. This test class ensures
 * the ResolveMessageUseCase works correctly for different locales and keys.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;

class ResolveMessageUseCaseTest {
  @Test
  void delegatesToPort() {
    I18nQueryPort port = new I18nQueryPort() {
      public String defaultLocale() { return "en"; }
      public java.util.List<String> supportedLocales() { return java.util.List.of(); }
      public String resolve(String k, String l) { return "res-" + k + "-" + l; }
    };
    var uc = new ResolveMessageUseCase(port);
    assertEquals("res-key-en", uc.execute("key", "en"));
  }
}
