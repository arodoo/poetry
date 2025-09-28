/*
 * File: GetDashboardOverviewUseCase.java
 * Purpose: Application service orchestrating dashboard overview retrieval.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import java.util.Optional;

import com.poetry.poetry_backend.application.dashboard.port.DashboardOverviewQueryPort;
import com.poetry.poetry_backend.domain.dashboard.model.DashboardOverview;

public class GetDashboardOverviewUseCase {
  private final DashboardOverviewQueryPort queryPort;

  public GetDashboardOverviewUseCase(DashboardOverviewQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public Optional<DashboardOverview> execute() {
    return queryPort.findOverview();
  }
}
