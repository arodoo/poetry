/*
 * File: UpdateI18nUseCaseTest.java
 * Purpose: Minimal test for update use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.i18n.port.I18nCommandPort;
import com.poetry.poetry_backend.domain.i18n.model.I18n;

class UpdateI18nUseCaseTest {
  @Test
  void updates() {
    I18nCommandPort cmd = new I18nCommandPort() {
      public I18n create(I18n i) { return null; }
      public I18n update(Long id, I18n i) { return i; }
      public void delete(Long id) { }
    };
    var uc = new UpdateI18nUseCase(cmd);
    var updated = uc.execute(5L, I18n.of("en", List.of("en")));
    assertEquals("en", updated.defaultLocale());
  }
}
