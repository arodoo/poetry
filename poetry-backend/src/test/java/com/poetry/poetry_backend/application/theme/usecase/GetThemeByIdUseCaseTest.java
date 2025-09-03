/*
 * File: GetThemeByIdUseCaseTest.java
 * Purpose: Placeholder test for get-by-id use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.domain.theme.exception.ThemeNotFoundException;
import com.poetry.poetry_backend.domain.theme.model.Theme;

class GetThemeByIdUseCaseTest {
  @Test
  void returnsTheme() {
    ThemeQueryPort query = new ThemeQueryPort() {
      public java.util.List<Theme> findAll() {
        return java.util.List.of();
      }

      public java.util.Optional<Theme> findById(Long id) {
        return java.util.Optional
            .of(Theme.createNew("x","X", java.util.Map.of("p", "#000")))
            .map(t -> t.withId(id));
      }

      public java.util.Optional<Theme> findActive() {
        return java.util.Optional.empty();
      }
    };
    var uc = new GetThemeByIdUseCase(query);
    assertEquals(1L, uc.execute(1L).getId());
  }

  @Test
  void notFound() {
    ThemeQueryPort query = new ThemeQueryPort() {
      public java.util.List<Theme> findAll() {
        return java.util.List.of();
      }

      public java.util.Optional<Theme> findById(Long id) {
        return java.util.Optional.empty();
      }

      public java.util.Optional<Theme> findActive() {
        return java.util.Optional.empty();
      }
    };
    var uc = new GetThemeByIdUseCase(query);
    assertThrows(ThemeNotFoundException.class, () -> uc.execute(9L));
  }
}
