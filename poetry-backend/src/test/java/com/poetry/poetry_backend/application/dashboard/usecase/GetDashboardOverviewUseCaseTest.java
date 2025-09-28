/*
 * File: GetDashboardOverviewUseCaseTest.java
 * Purpose: Ensure dashboard overview use case delegates to its port.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.dashboard.port.DashboardOverviewQueryPort;
import com.poetry.poetry_backend.domain.dashboard.model.DashboardOverview;

class GetDashboardOverviewUseCaseTest {
  @Test
  void returnsOverviewWhenAvailable() {
    DashboardOverview overview = new DashboardOverview(1, 1, 0, 4,
        "ui.dashboard.overview.highlight.default", "2025-09-28T00:00:00Z");
    DashboardOverviewQueryPort port = () -> Optional.of(overview);
    GetDashboardOverviewUseCase useCase = new GetDashboardOverviewUseCase(port);
    assertTrue(useCase.execute().isPresent());
  }
}
