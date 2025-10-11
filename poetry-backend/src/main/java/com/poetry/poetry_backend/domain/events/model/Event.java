/*
 * File: Event.java
 * Purpose: Immutable record representing an event aggregate. Contains
 * event details including location coordinates for geospatial queries.
 * Validation logic resides in EventValidator to keep record concise.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.events.model;

import java.time.Instant;

public record Event(
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
  public boolean isDeleted() {
    return deletedAt != null;
  }

  public boolean isPublished() {
    return status == EventStatus.PUBLISHED && !isDeleted();
  }
}
