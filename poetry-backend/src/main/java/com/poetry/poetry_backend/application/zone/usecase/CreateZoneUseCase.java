/*
 * File: CreateZoneUseCase.java
 * Purpose: Coordinate zone creation by validating input and delegating
 * to command port. Returns created zone aggregate with generated ID
 * and timestamps for immediate use by interface layer.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.zone.usecase;

import com.poetry.poetry_backend.application.zone.port.ZoneCommandPort;
import com.poetry.poetry_backend.domain.zone.model.Zone;

public class CreateZoneUseCase {
  private final ZoneCommandPort commands;

  public CreateZoneUseCase(ZoneCommandPort commands) {
    this.commands = commands;
  }

  public Zone execute(String name, String description, Long managerId) {
    return commands.create(name, description, managerId);
  }
}
