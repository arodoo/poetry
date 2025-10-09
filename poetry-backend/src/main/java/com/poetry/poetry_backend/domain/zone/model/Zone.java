/*
 * File: Zone.java
 * Purpose: Immutable record representing zone aggregate state.
 * Contains zone identification, description, manager reference, and
 * audit timestamps for tracking zone lifecycle within the system.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.zone.model;

import java.time.Instant;

public record Zone(
    Long id,
    String name,
    String description,
    Long managerId,
    Instant createdAt,
    Instant updatedAt,
    Instant deletedAt,
    long version) {
  public boolean isDeleted() {
    return deletedAt != null;
  }
}
