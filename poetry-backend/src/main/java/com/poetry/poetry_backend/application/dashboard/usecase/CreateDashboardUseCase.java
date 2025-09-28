/*
 * File: CreateDashboardUseCase.java
 * Purpose: Persist new dashboards ensuring slug uniqueness.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dashboard.usecase;

import com.poetry.poetry_backend.application.dashboard.exception.*;
import com.poetry.poetry_backend.application.dashboard.port.*;
import com.poetry.poetry_backend.domain.dashboard.model.*;

public class CreateDashboardUseCase {
  private final DashboardCommandPort commandPort;

  public CreateDashboardUseCase(DashboardCommandPort commandPort) {
    this.commandPort = commandPort;
  }

  public Dashboard execute(
      String name,
      String slug,
      String description) {
    if (commandPort.existsBySlug(slug)) {
      throw new DashboardSlugAlreadyExistsException();
    }
    Dashboard dashboard = new Dashboard(null, name, slug, description, null);
    return commandPort.save(dashboard);
  }
}
