/*
 * File: FingerprintSlotHistory.java
 * Purpose: Immutable audit record tracking R503 slot assignments.
 * Records when slots assigned, released, and why. Enables forensic
 * analysis of slot reuse over time. Pure domain model.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import java.time.Instant;

public record FingerprintSlotHistory(
    Long id,
    Long fingerprintId,
    Long userId,
    Integer r503SlotId,
    Instant assignedAt,
    Instant releasedAt,
    SlotHistoryReason reason) {

  public boolean isActive() {
    return releasedAt == null;
  }

  public boolean wasReleased() {
    return releasedAt != null;
  }
}
