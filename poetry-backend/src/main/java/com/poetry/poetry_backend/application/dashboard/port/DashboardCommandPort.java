/*
 * File: DashboardCommandPort.java
 * Purpose: Mutation contract for persisting dashboard aggregates.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.port;

import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

public interface DashboardCommandPort {
  Dashboard save(Dashboard dashboard);

  void deleteById(Long id);

  boolean existsBySlug(String slug);
}
