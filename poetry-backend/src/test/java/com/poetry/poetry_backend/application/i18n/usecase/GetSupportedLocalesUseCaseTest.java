/*
 * File: GetSupportedLocalesUseCaseTest.java
 * Purpose: Tests supported locales use case. This test class verifies
 * the functionality of GetSupportedLocalesUseCase with various scenarios.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.i18n.port.I18nQueryPort;

class GetSupportedLocalesUseCaseTest {
  @Test void returnsSupported() {
    I18nQueryPort port = new I18nQueryPort() {
      public String defaultLocale() { return "en"; }
      public List<String> supportedLocales() { return List.of("en","es"); }
      public String resolve(String k,String l){ return k; }
    };
    var uc = new GetSupportedLocalesUseCase(port);
    assertEquals(List.of("en","es"), uc.execute());
  }
}
