/*
 * File: DashboardQueryPort.java
 * Purpose: Read-side contract for retrieving dashboards.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.port;

import java.util.List;
import java.util.Optional;

import com.poetry.poetry_backend.domain.dashboard.model.Dashboard;

public interface DashboardQueryPort {
  List<Dashboard> findAll();

  Optional<Dashboard> findById(Long id);
}
