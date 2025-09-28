/*
 * File: DashboardOverviewQueryPort.java
 * Purpose: Application port exposing dashboard overview retrieval contract.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.port;

import java.util.Optional;

import com.poetry.poetry_backend.domain.dashboard.model.DashboardOverview;

public interface DashboardOverviewQueryPort {
  Optional<DashboardOverview> findOverview();
}
