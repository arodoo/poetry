/*
 * File: ZoneJpaMapper.java
 * Purpose: Mapping helper to convert JPA ZoneEntity instances to domain
 * Zone models. Isolates mapping logic from adapters so adapters remain
 * focused on repository interactions and wiring. Keeps conversion code
 * reusable and testable in isolation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.zone;

import com.poetry.poetry_backend.domain.zone.model.Zone;
import com.poetry.poetry_backend.domain.zone.model.ZoneRehydrator;

public final class ZoneJpaMapper {
  private ZoneJpaMapper() {}

  public static Zone toDomain(ZoneEntity e) {
    return ZoneRehydrator.rehydrate(
        e.getId(),
        e.getName(),
        e.getDescription(),
        e.getManagerId(),
        e.getStatus(),
        e.getCreatedAt(),
        e.getUpdatedAt(),
        e.getDeletedAt(),
        e.getVersion() == null ? 0L : e.getVersion());
  }
}
