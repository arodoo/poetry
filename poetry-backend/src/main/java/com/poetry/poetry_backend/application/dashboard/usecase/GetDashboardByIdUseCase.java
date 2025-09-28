/*
 * File: GetDashboardByIdUseCase.java
 * Purpose: Retrieve a dashboard aggregate by identifier.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.domain.dashboard.exception.DashboardNotFoundException;
import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

public class GetDashboardByIdUseCase {
  private final DashboardQueryPort queryPort;

  public GetDashboardByIdUseCase(DashboardQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public Dashboard execute(Long id) {
    return queryPort
        .findById(id)
        .orElseThrow(() -> new DashboardNotFoundException(id));
  }
}
