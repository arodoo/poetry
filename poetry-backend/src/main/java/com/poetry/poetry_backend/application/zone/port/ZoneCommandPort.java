/*
 * File: ZoneCommandPort.java
 * Purpose: Define command operations for zone lifecycle and mutations
 * used by the application layer. Exposes create, update, and soft
 * delete operations while shielding application logic from persistence
 * details. Implementations must honor signatures and domain invariants.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.zone.port;

import com.poetry.poetry_backend.domain.zone.model.Zone;

public interface ZoneCommandPort {
  Zone create(String name, String description, Long managerId);

  Zone update(
      Long id,
      long version,
      String name,
      String description,
      Long managerId,
      String status);

  void softDelete(Long id, long version);
}
