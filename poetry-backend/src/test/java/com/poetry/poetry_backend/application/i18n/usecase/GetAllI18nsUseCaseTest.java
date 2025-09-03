/*
 * File: GetAllI18nsUseCaseTest.java
 * Purpose: Minimal test for list use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;

class GetAllI18nsUseCaseTest {
  @Test
  void lists() {
    I18nQueryPort port = new I18nQueryPort() {
      public String defaultLocale() { return "en"; }
      public List<String> supportedLocales() { return List.of("en", "es"); }
      public String resolve(String key, String localeTag) { return null; }
    };
    var uc = new GetAllI18nsUseCase(port);
    assertEquals(2, uc.execute().size());
  }
}
