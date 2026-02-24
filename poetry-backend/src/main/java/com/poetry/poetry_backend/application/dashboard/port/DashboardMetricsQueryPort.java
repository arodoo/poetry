/*
 * File: DashboardMetricsQueryPort.java
 * Purpose: Read-only port to fetch aggregated system metrics for the charts dashboard.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.dashboard.port;

import com.poetry.poetry_backend.application.dashboard.dto.DashboardMetricsDto;

public interface DashboardMetricsQueryPort {
  DashboardMetricsDto getMetrics();
}
