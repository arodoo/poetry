/*
 * File: UpdateDashboardUseCaseTest.java
 * Purpose: Validate update succeeds when slug unused.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.port.DashboardCommandPort;
import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

class UpdateDashboardUseCaseTest {
  private static final class QueryStub implements DashboardQueryPort {
    @Override public List<Dashboard> findAll() { return List.of(); }
    @Override public Optional<Dashboard> findById(Long id) {
      return Optional.of(new Dashboard(id, "Main", "main", "desc", null));
    }
  }

  private static final class CommandStub implements DashboardCommandPort {
    @Override public Dashboard save(Dashboard dashboard) { return dashboard; }
    @Override public void deleteById(Long id) {}
    @Override public boolean existsBySlug(String slug) { return false; }
  }

  @Test
  void updatesDashboard() {
    Dashboard updated = new UpdateDashboardUseCase(new QueryStub(), new CommandStub())
        .execute(1L, "Updated", "main", "desc");
    assertEquals("Updated", updated.name());
  }
}
