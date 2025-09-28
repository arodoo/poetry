/*
 * File: CreateDashboardUseCaseTest.java
 * Purpose: Validate dashboard creation behavior and conflicts.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.port.DashboardCommandPort;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

class CreateDashboardUseCaseTest {
  private static final class CommandStub implements DashboardCommandPort {
    @Override public Dashboard save(Dashboard dashboard) { return dashboard; }
    @Override public void deleteById(Long id) {}
    @Override public boolean existsBySlug(String slug) { return false; }
  }

  @Test
  void createsWhenSlugFree() {
    Dashboard result = new CreateDashboardUseCase(new CommandStub())
        .execute("Main", "main-dashboard", "desc");
    assertEquals("main-dashboard", result.slug());
  }
}
