/*
 * File: UpdateThemeUseCaseTest.java
 * Purpose: Placeholder test for update use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.crud.UpdateThemeUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;

class UpdateThemeUseCaseTest {
  @Test
  void updatesTheme() {
    final Theme existing = Theme.createNew("old", "Old", Map.of("p", "#111")).withId(5L);
    ThemeQueryPort query = new ThemeQueryPort() {
      public java.util.List<Theme> findAll() {
        return java.util.List.of();
      }

      public java.util.Optional<Theme> findById(Long id) {
        return java.util.Optional.of(existing);
      }

      public java.util.Optional<Theme> findActive() {
        return java.util.Optional.empty();
      }
    };
    ThemeCommandPort cmd = new ThemeCommandPort() {
      public Theme save(Theme theme) {
        return theme;
      }

      public void deleteSoft(Long id) {
      }

      public void restore(Long id) {
      }

      public void deactivateAll() {
      }

      public long count() {
        return 0;
      }
    };
    var uc = new UpdateThemeUseCase(query, cmd);
    var updated = uc.execute(5L, "New", Map.of("p", "#222"));
    assertEquals("New", updated.getName());
  }
}
