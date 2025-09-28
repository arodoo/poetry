/*
 * File: UpdateDashboardUseCase.java
 * Purpose: Apply dashboard updates while guarding invariants.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import com.poetry.poetry_backend.application.dashboard.exception.*;
import com.poetry.poetry_backend.application.dashboard.port.*;
import com.poetry.poetry_backend.domain.dashboard.exception.*;
import com.poetry.poetry_backend.domain.dashboard.model.*;

public class UpdateDashboardUseCase {
  private final DashboardQueryPort queryPort;
  private final DashboardCommandPort commandPort;

  public UpdateDashboardUseCase(
      DashboardQueryPort queryPort,
      DashboardCommandPort commandPort) {
    this.queryPort = queryPort;
    this.commandPort = commandPort;
  }

  public Dashboard execute(Long id, String name, String slug, String description) {
    if (id == null) {
      throw new IllegalArgumentException("dashboard.id.required");
    }
  Dashboard current = queryPort.findById(id)
    .orElseThrow(() -> new DashboardNotFoundException(id));
  boolean slugChanged = !current.slug().equals(slug);
  if (slugChanged && commandPort.existsBySlug(slug)) {
      throw new DashboardSlugAlreadyExistsException();
    }
    Dashboard updated = new Dashboard(id, name, slug, description, current.createdAt());
    return commandPort.save(updated);
  }
}
