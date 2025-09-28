/*
 * File: DashboardControllerNegativeTest.java
 * Purpose: Validate dashboard controller propagates not-found errors.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dashboard;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.application.dashboard.usecase.GetAllDashboardsUseCase;
import com.poetry.poetry_backend.application.dashboard.usecase.GetDashboardByIdUseCase;
import com.poetry.poetry_backend.domain.dashboard.exception.DashboardNotFoundException;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;
class DashboardControllerNegativeTest {
  private static final class QueryStub implements DashboardQueryPort {
    @Override public List<Dashboard> findAll() { return List.of(); }
    @Override public Optional<Dashboard> findById(Long id) { return Optional.empty(); }
  }
  @Test void throwsWhenDashboardMissing() {
    DashboardController controller = new DashboardController(
        new GetAllDashboardsUseCase(new QueryStub()),
        new GetDashboardByIdUseCase(new QueryStub()));
    assertThrows(DashboardNotFoundException.class, () -> controller.getDashboard(9L));
  }
}
