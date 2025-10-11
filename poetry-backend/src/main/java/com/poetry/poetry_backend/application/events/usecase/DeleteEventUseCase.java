/*
 * File: DeleteEventUseCase.java
 * Purpose: Use case for soft-deleting events. Sets deletedAt timestamp
 * rather than removing from database. Follows domain soft-delete policy.
 * Increments version.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.events.usecase;

import java.time.Instant;

import com.poetry.poetry_backend.application.events.port.EventsCommandPort;
import com.poetry.poetry_backend.application.events.port.EventsQueryPort;
import com.poetry.poetry_backend.domain.events.model.Event;
import com.poetry.poetry_backend.domain.events.model.EventRehydrator;

public class DeleteEventUseCase {
  private final EventsQueryPort queryPort;
  private final EventsCommandPort commandPort;

  public DeleteEventUseCase(EventsQueryPort queryPort, EventsCommandPort commandPort) {
    this.queryPort = queryPort;
    this.commandPort = commandPort;
  }

  public void execute(Long id) {
    Event existing =
        queryPort.findById(id).orElseThrow(() -> new IllegalArgumentException("Event not found"));
    Event deleted =
        EventRehydrator.rehydrate(
            existing.id(),
            existing.userId(),
            existing.title(),
            existing.description(),
            existing.locationName(),
            existing.latitude(),
            existing.longitude(),
            existing.eventDate(),
            existing.status(),
            existing.imageUrl(),
            existing.createdAt(),
            Instant.now(),
            Instant.now(),
            existing.version() + 1);
    commandPort.save(deleted);
  }
}
