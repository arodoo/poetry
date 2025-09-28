/*
 * File: GetAllDashboardsUseCaseTest.java
 * Purpose: Verify dashboards listing delegates to query port.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

class GetAllDashboardsUseCaseTest {
  private static final class QueryStub implements DashboardQueryPort {
    @Override public List<Dashboard> findAll() {
      return List.of(new Dashboard(1L, "Main", "main", null, null));
    }
    @Override public Optional<Dashboard> findById(Long id) { return Optional.empty(); }
  }

  @Test
  void returnsDashboardsFromPort() {
    List<Dashboard> dashboards = new GetAllDashboardsUseCase(new QueryStub()).execute();
    assertEquals(1, dashboards.size());
  }
}
