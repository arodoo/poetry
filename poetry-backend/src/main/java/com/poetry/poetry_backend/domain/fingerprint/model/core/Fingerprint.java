/*
 * File: Fingerprint.java
 * Purpose: Immutable aggregate root representing a fingerprint enrollment.
 * Stores FMD (Base64) for HID Digital Persona readers. 
 * Validation enforced via FingerprintValidator.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.core;

import java.time.Instant;

public record Fingerprint(
    Long id,
    Long userId,
    String fmd,
    FingerprintStatus status,
    Instant enrolledAt,
    Instant archivedAt,
    Instant lastActivityAt,
    Instant createdAt,
    Instant updatedAt,
    Instant deletedAt,
    long version) {

  public boolean isDeleted() {
    return deletedAt != null;
  }

  public boolean isActive() {
    return status == FingerprintStatus.ACTIVE && !isDeleted();
  }

  public boolean isArchived() {
    return status == FingerprintStatus.ARCHIVED && !isDeleted();
  }

  public boolean canVerify() {
    return isActive() && fmd != null;
  }

  public boolean hasFmd() {
    return fmd != null && !fmd.isEmpty();
  }
}
