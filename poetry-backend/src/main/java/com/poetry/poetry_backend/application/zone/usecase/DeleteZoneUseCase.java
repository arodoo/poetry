/*
 * File: DeleteZoneUseCase.java
 * Purpose: Coordinate zone soft deletion with optimistic locking.
 * Delegates to command port which sets deletedAt timestamp and
 * enforces version check to prevent concurrent modification conflicts.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.zone.usecase;

import com.poetry.poetry_backend.application.zone.port.ZoneCommandPort;

public class DeleteZoneUseCase {
  private final ZoneCommandPort commands;

  public DeleteZoneUseCase(ZoneCommandPort commands) {
    this.commands = commands;
  }

  public void execute(Long id, long version) {
    commands.softDelete(id, version);
  }
}
