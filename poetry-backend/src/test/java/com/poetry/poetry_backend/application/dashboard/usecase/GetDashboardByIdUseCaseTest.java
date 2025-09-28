/*
 * File: GetDashboardByIdUseCaseTest.java
 * Purpose: Ensure single dashboard retrieval is delegated to port.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

class GetDashboardByIdUseCaseTest {
  private static final class QueryStub implements DashboardQueryPort {
    @Override public List<Dashboard> findAll() { return List.of(); }
    @Override public Optional<Dashboard> findById(Long id) {
      return Optional.of(new Dashboard(id, "Main", "main", null, null));
    }
  }

  @Test
  void returnsDashboardWhenPresent() {
    Dashboard dashboard = new GetDashboardByIdUseCase(new QueryStub()).execute(7L);
    assertEquals(7L, dashboard.id());
  }
}
