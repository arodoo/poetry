/*
 * File: ZoneJpaCommandSupport.java
 * Purpose: Helper utilities for zone command operations including guard
 * validation and entity persistence. Extracted to keep command adapter
 * focused and within line limits while centralizing reusable logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.zone;


import com.poetry.poetry_backend.domain.zone.exception.ZoneNotFoundException;
import com.poetry.poetry_backend.domain.zone.model.Zone;

final class ZoneJpaCommandSupport {
  private ZoneJpaCommandSupport() {}

  static void applyFields(
      ZoneEntity entity, String name, String description, Long managerId) {
    entity.setName(name);
    entity.setDescription(description);
    entity.setManagerId(managerId);
    if (entity.getStatus() == null || entity.getStatus().isBlank()) {
      entity.setStatus("active");
    }
  }

  static ZoneEntity guard(ZoneJpaRepository repository, Long id, long version) {
    ZoneEntity entity =
        repository
            .findById(id)
            .orElseThrow(() -> new ZoneNotFoundException(id));
    Long currentVersion = entity.getVersion();
    if (currentVersion != null && !currentVersion.equals(version)) {
      throw new IllegalArgumentException("zone.version.mismatch");
    }
    return entity;
  }

  static Zone persist(ZoneJpaRepository repository, ZoneEntity entity) {
    return ZoneJpaMapper.toDomain(repository.save(entity));
  }
}
