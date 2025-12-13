/*
 * File: GetAllThemesUseCaseTest.java
 * Purpose: Placeholder test for list use case.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetAllThemesUseCase;
import com.poetry.poetry_backend.domain.theme.model.Theme;

class GetAllThemesUseCaseTest {
  @Test
  void returnsList() {
    ThemeQueryPort query = new ThemeQueryPort() {
      public List<Theme> findAll() {
        return List.of(
            Theme.createNew("a", "A", java.util.Map.of("p", "#fff")));
      }

      public java.util.Optional<Theme> findById(Long id) {
        return java.util.Optional.empty();
      }

      public java.util.Optional<Theme> findByKey(String key) {
        return java.util.Optional.empty();
      }

      public java.util.Optional<Theme> findActive() {
        return java.util.Optional.empty();
      }
    };
    var uc = new GetAllThemesUseCase(query);
    assertEquals(1, uc.execute().size());
  }
}
