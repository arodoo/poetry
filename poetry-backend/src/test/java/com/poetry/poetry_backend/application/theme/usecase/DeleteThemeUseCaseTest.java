/*
 * File: DeleteThemeUseCaseTest.java
 * Purpose: Placeholder test for delete use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.domain.theme.model.Theme;

class DeleteThemeUseCaseTest {
  @Test
  void deletesWhenCalled() {
    final long[] deleted = {0};
    ThemeCommandPort cmd = new ThemeCommandPort() {
      public Theme save(Theme theme) { return theme; }
      public void deleteSoft(Long id) { deleted[0] = id; }
      public void restore(Long id) { }
      public void deactivateAll() { }
      public long count() { return 0; }
    };
    var uc = new DeleteThemeUseCase(cmd);
    uc.execute(3L);
    assertEquals(3L, deleted[0]);
  }
}
