/*
 * File: CreateEventUseCase.java
 * Purpose: Use case for creating a new event. Validates input, creates
 * domain object via factory, persists via command port. Returns created
 * event with generated ID.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.events.usecase;

import java.time.Instant;

import com.poetry.poetry_backend.application.events.port.EventsCommandPort;
import com.poetry.poetry_backend.domain.events.model.Event;
import com.poetry.poetry_backend.domain.events.model.EventFactory;

public class CreateEventUseCase {
  private final EventsCommandPort commandPort;

  public CreateEventUseCase(EventsCommandPort commandPort) {
    this.commandPort = commandPort;
  }

  public Event execute(
      Long userId,
      String title,
      String description,
      String locationName,
      Double latitude,
      Double longitude,
      Instant eventDate,
      String imageUrl) {
    Event event =
        EventFactory.create(
            userId, title, description, locationName, latitude, longitude, eventDate, imageUrl);
    return commandPort.save(event);
  }
}
