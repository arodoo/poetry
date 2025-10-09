/*
 * File: ZoneJpaCommandAdapter.java
 * Purpose: Handles zone command operations including create, update,
 * and soft delete delegating to support helpers for guard and persist
 * logic to maintain clean separation and testable command semantics.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.zone;

import static com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaCommandSupport.*;

import java.time.Instant;

import com.poetry.poetry_backend.application.zone.port.ZoneCommandPort;
import com.poetry.poetry_backend.domain.zone.model.Zone;

public class ZoneJpaCommandAdapter implements ZoneCommandPort {
  private final ZoneJpaRepository repo;

  public ZoneJpaCommandAdapter(ZoneJpaRepository repo) {
    this.repo = repo;
  }

  public Zone create(String name, String description, Long managerId) {
    ZoneEntity entity = new ZoneEntity();
    applyFields(entity, name, description, managerId);
    return persist(repo, entity);
  }

  public Zone update(
      Long id,
      long version,
      String name,
      String description,
      Long managerId,
      String status) {
    ZoneEntity entity = guard(repo, id, version);
    applyFields(entity, name, description, managerId);
    entity.setStatus(status);
    return persist(repo, entity);
  }

  public void softDelete(Long id, long version) {
    ZoneEntity entity = guard(repo, id, version);
    entity.setStatus("inactive");
    entity.setDeletedAt(Instant.now());
    repo.save(entity);
  }
}
