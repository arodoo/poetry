/*
 * File: UpdateEventUseCase.java
 * Purpose: Use case for updating existing event. Loads current state,
 * applies updates, validates, persists. Increments version for optimistic
 * locking. Preserves created timestamp.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.events.usecase;

import java.time.Instant;

import com.poetry.poetry_backend.application.events.port.EventsCommandPort;
import com.poetry.poetry_backend.application.events.port.EventsQueryPort;
import com.poetry.poetry_backend.domain.events.model.Event;
import com.poetry.poetry_backend.domain.events.model.EventRehydrator;
import com.poetry.poetry_backend.domain.events.model.EventStatus;

public class UpdateEventUseCase {
  private final EventsQueryPort queryPort;
  private final EventsCommandPort commandPort;

  public UpdateEventUseCase(EventsQueryPort queryPort, EventsCommandPort commandPort) {
    this.queryPort = queryPort;
    this.commandPort = commandPort;
  }

  public Event execute(
      Long id,
      String title,
      String description,
      String locationName,
      Double latitude,
      Double longitude,
      Instant eventDate,
      EventStatus status,
      String imageUrl) {
    Event existing =
        queryPort.findById(id).orElseThrow(() -> new IllegalArgumentException("Event not found"));
    Event updated =
        EventRehydrator.rehydrate(
            existing.id(),
            existing.userId(),
            title,
            description,
            locationName,
            latitude,
            longitude,
            eventDate,
            status,
            imageUrl,
            existing.createdAt(),
            Instant.now(),
            existing.deletedAt(),
            existing.version() + 1);
    return commandPort.save(updated);
  }
}
