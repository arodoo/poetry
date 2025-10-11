/*
 * File: EventRehydrator.java
 * Purpose: Reconstructs Event aggregate from persistence layer data.
 * Used by infrastructure adapters to convert entities back to domain
 * objects. Validates rehydrated instances.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.events.model;

import java.time.Instant;

public final class EventRehydrator {
  private EventRehydrator() {}

  public static Event rehydrate(
      Long id,
      Long userId,
      String title,
      String description,
      String locationName,
      Double latitude,
      Double longitude,
      Instant eventDate,
      EventStatus status,
      String imageUrl,
      Instant createdAt,
      Instant updatedAt,
      Instant deletedAt,
      long version) {
    Event event =
        new Event(
            id,
            userId,
            title,
            description,
            locationName,
            latitude,
            longitude,
            eventDate,
            status,
            imageUrl,
            createdAt,
            updatedAt,
            deletedAt,
            version);
    EventValidator.validate(event);
    return event;
  }
}
