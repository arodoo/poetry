/*
 * File: CreateDashboardUseCaseNegativeTest.java
 * Purpose: Ensure creation rejects duplicate slugs.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.exception.*;
import com.poetry.poetry_backend.application.dashboard.port.*;
import com.poetry.poetry_backend.domain.dashboard.model.*;

class CreateDashboardUseCaseNegativeTest {
  private static final class CommandStub implements DashboardCommandPort {
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
  }

  @Test
  void throwsConflictWhenSlugExists() {
    assertThrows(DashboardSlugAlreadyExistsException.class, () ->
        new CreateDashboardUseCase(new CommandStub())
            .execute("Main", "main-dashboard", "desc"));
  }
}
