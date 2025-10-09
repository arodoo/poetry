/*
 * File: ZoneRehydrator.java
 * Purpose: Factory for rehydrating Zone domain objects from persistence.
 * Provides controlled reconstruction bypassing constructor validation
 * for trusted sources like database and in-memory store adapters.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.zone.model;

import java.time.Instant;

public final class ZoneRehydrator {
  private ZoneRehydrator() {}

  public static Zone rehydrate(
      Long id,
      String name,
      String description,
      Long managerId,
      String status,
      Instant createdAt,
      Instant updatedAt,
      Instant deletedAt,
      long version) {
    return new Zone(
        id,
        name,
        description,
        managerId,
        status == null || status.isBlank() ? "active" : status,
        createdAt,
        updatedAt,
        deletedAt,
        version);
  }
}
