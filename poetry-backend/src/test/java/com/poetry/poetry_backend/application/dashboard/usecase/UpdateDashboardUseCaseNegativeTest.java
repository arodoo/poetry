/*
 * File: UpdateDashboardUseCaseNegativeTest.java
 * Purpose: Ensure update enforces slug uniqueness and presence.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.exception.*;
import com.poetry.poetry_backend.application.dashboard.port.*;
import com.poetry.poetry_backend.domain.dashboard.model.*;

class UpdateDashboardUseCaseNegativeTest {
  @Test void throwsWhenSlugAlreadyUsed() {
    DashboardQueryPort query = new DashboardQueryPort() {
      @Override
      public List<Dashboard> findAll() {
        return List.of();
      }

      @Override
      public Optional<Dashboard> findById(Long id) {
        return Optional.of(new Dashboard(id, "Main", "main", null, null));
      }
    };
    DashboardCommandPort command = new DashboardCommandPort() {
      @Override
      public Dashboard save(Dashboard dashboard) {
        return dashboard;
      }

      @Override
      public void deleteById(Long id) {}

      @Override
      public boolean existsBySlug(String slug) {
        return true;
      }
    };
    assertThrows(DashboardSlugAlreadyExistsException.class, () ->
        new UpdateDashboardUseCase(query, command).execute(1L, "Updated", "new", null));
  }
}
