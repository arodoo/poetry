/*
 * File: EventFactory.java
 * Purpose: Factory for creating new Event instances with initial state.
 * Sets DRAFT status by default, generates timestamps, and validates
 * before returning instance.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.events.model;

import java.time.Instant;

public final class EventFactory {
  private EventFactory() {}

  public static Event create(
      Long userId,
      String title,
      String description,
      String locationName,
      Double latitude,
      Double longitude,
      Instant eventDate,
      String imageUrl) {
    Instant now = Instant.now();
    Event event =
        new Event(
            null,
            userId,
            title,
            description,
            locationName,
            latitude,
            longitude,
            eventDate,
            EventStatus.DRAFT,
            imageUrl,
            now,
            now,
            null,
            0L);
    EventValidator.validate(event);
    return event;
  }
}
