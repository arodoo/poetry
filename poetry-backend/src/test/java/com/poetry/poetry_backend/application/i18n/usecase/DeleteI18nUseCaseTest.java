/*
 * File: DeleteI18nUseCaseTest.java
 * Purpose: Minimal test for delete use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.i18n.port.I18nCommandPort;
import com.poetry.poetry_backend.domain.i18n.model.I18n;

class DeleteI18nUseCaseTest {
  @Test
  void deletes() {
    final long[] deleted = {0};
    I18nCommandPort cmd = new I18nCommandPort() {
      public I18n create(I18n i) { return null; }
      public I18n update(Long id, I18n i) { return null; }
      public void delete(Long id) { deleted[0] = id; }
    };
    var uc = new DeleteI18nUseCase(cmd);
    uc.execute(9L);
    assertEquals(9L, deleted[0]);
  }
}
