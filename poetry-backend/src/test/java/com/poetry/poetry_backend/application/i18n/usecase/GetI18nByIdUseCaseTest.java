/*
 * File: GetI18nByIdUseCaseTest.java
 * Purpose: Minimal test for get-by-id placeholder (no id logic yet).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;
import com.poetry.poetry_backend.domain.i18n.model.I18n;

class GetI18nByIdUseCaseTest {
  @Test
  void returns() {
    I18nQueryPort port = new I18nQueryPort() {
      public String defaultLocale() { return "en"; }
      public List<String> supportedLocales() { return List.of("en"); }
      public String resolve(String key, String localeTag) { return null; }
    };
    var uc = new GetI18nByIdUseCase(port);
    I18n i = uc.execute(1L);
    assertEquals("en", i.defaultLocale());
  }
}
