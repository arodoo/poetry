/*
 * File: DeleteDashboardUseCase.java
 * Purpose: Remove dashboards in a safe, idempotent manner.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import com.poetry.poetry_backend.application.dashboard.port.DashboardCommandPort;
import com.poetry.poetry_backend.application.dashboard.port.DashboardQueryPort;
import com.poetry.poetry_backend.domain.dashboard.exception.DashboardNotFoundException;

public class DeleteDashboardUseCase {
  private final DashboardQueryPort queryPort;
  private final DashboardCommandPort commandPort;

  public DeleteDashboardUseCase(
      DashboardQueryPort queryPort, DashboardCommandPort commandPort) {
    this.queryPort = queryPort;
    this.commandPort = commandPort;
  }

  public void execute(Long id) {
    queryPort.findById(id)
        .orElseThrow(() -> new DashboardNotFoundException(id));
    commandPort.deleteById(id);
  }
}
