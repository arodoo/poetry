/*
 * File: GetAllDashboardsUseCase.java
 * Purpose: List dashboards for administrative tooling.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

public class GetAllDashboardsUseCase {
  private final DashboardQueryPort queryPort;

  public GetAllDashboardsUseCase(DashboardQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public List<Dashboard> execute() {
    return queryPort.findAll();
  }
}
