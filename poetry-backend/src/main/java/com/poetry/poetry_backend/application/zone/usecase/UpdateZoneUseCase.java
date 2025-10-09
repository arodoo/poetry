/*
 * File: UpdateZoneUseCase.java
 * Purpose: Coordinate zone update with optimistic locking. Validates
 * inputs and delegates to command port which enforces version check
 * and throws on conflicts or missing records.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.zone.usecase;

import com.poetry.poetry_backend.application.zone.port.ZoneCommandPort;
import com.poetry.poetry_backend.domain.zone.model.Zone;

public class UpdateZoneUseCase {
  private final ZoneCommandPort commands;

  public UpdateZoneUseCase(ZoneCommandPort commands) {
    this.commands = commands;
  }

  public Zone execute(
      Long id,
      long version,
      String name,
      String description,
      Long managerId,
      String status) {
    return commands.update(id, version, name, description, managerId, status);
  }
}
