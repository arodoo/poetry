/*
 * File: GetDashboardByIdUseCaseNegativeTest.java
 * Purpose: Ensure not-found dashboards raise exception.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.domain.dashboard.exception.DashboardNotFoundException;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

class GetDashboardByIdUseCaseNegativeTest {
  private static final class QueryStub implements DashboardQueryPort {
    @Override public List<Dashboard> findAll() { return List.of(); }
    @Override public Optional<Dashboard> findById(Long id) { return Optional.empty(); }
  }

  @Test
  void throwsWhenDashboardMissing() {
    assertThrows(DashboardNotFoundException.class, () ->
        new GetDashboardByIdUseCase(new QueryStub()).execute(7L));
  }
}
