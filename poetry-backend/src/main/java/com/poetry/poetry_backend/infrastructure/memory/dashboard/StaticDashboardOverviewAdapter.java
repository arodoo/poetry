/*
 * File: StaticDashboardOverviewAdapter.java
 * Purpose: Temporary in-memory adapter returning safe default dashboard data
 *          until analytics integration is implemented.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.dashboard;

import java.time.Clock;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import com.poetry.poetry_backend.application.dashboard.port.DashboardOverviewQueryPort;
import com.poetry.poetry_backend.domain.dashboard.model.DashboardOverview;

public class StaticDashboardOverviewAdapter implements DashboardOverviewQueryPort {
  private final Clock clock;

  public StaticDashboardOverviewAdapter(Clock clock) {
    this.clock = clock;
  }

  @Override
  public Optional<DashboardOverview> findOverview() {
    String label = DateTimeFormatter.ISO_INSTANT.format(Instant.now(clock));
    DashboardOverview overview = new DashboardOverview(
        0,
        0,
        0,
        0,
        "ui.dashboard.overview.highlight.default",
        label);
    return Optional.of(overview);
  }
}
