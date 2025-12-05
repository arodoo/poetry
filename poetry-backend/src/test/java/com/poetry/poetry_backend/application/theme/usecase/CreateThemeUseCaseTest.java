/*
 * File: CreateThemeUseCaseTest.java
 * Purpose: Placeholder test for create use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.ThemeCommandPort;
import com.poetry.poetry_backend.application.theme.usecase.crud.CreateThemeUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;

class CreateThemeUseCaseTest {
  @Test
  void createsTheme() {
    ThemeCommandPort cmd = new ThemeCommandPort() {
      public Theme save(Theme theme) {
        return theme.withId(1L);
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
    var uc = new CreateThemeUseCase(cmd);
    var created = uc.execute("new", "New", Map.of("primary", "#000"));
    assertNotNull(created.getId());
  }
}
