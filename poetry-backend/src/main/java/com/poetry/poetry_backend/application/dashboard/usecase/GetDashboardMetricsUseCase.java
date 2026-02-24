/*
 * File: GetDashboardMetricsUseCase.java
 * Purpose: Application use case to retrieve the dashboard metrics without side effects.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dashboard.usecase;

import org.springframework.stereotype.Service;

import com.poetry.poetry_backend.application.dashboard.dto.DashboardMetricsDto;
import com.poetry.poetry_backend.application.dashboard.port.DashboardMetricsQueryPort;

@Service
public class GetDashboardMetricsUseCase {
  private final DashboardMetricsQueryPort dashboardMetricsQueryPort;

  public GetDashboardMetricsUseCase(DashboardMetricsQueryPort dashboardMetricsQueryPort) {
    this.dashboardMetricsQueryPort = dashboardMetricsQueryPort;
  }

  public DashboardMetricsDto execute() {
    return dashboardMetricsQueryPort.getMetrics();
  }
}
