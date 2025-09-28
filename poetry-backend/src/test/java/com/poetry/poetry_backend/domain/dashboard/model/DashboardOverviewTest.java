/*
 * File: DashboardOverviewTest.java
 * Purpose: Validate DashboardOverview domain invariants.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.dashboard.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class DashboardOverviewTest {
  @Test
  void createsWithConsistentMetrics() {
    DashboardOverview model = new DashboardOverview(2, 1, 1, 3,
        "ui.dashboard.overview.highlight.default", "2025-09-28T00:00:00Z");
    assertEquals(2, model.totalPoems());
  }

  @Test
  void whenDraftsExceedTotalShouldFail() {
    assertThrows(IllegalArgumentException.class, () ->
        new DashboardOverview(1, 0, 2, 0,
            "ui.dashboard.overview.highlight.default", "2025-09-28T00:00:00Z"));
  }
}
