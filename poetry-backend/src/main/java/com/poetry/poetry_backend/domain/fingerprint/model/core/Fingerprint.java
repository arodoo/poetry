/*
 * File: Fingerprint.java
 * Purpose: Immutable aggregate root representing a fingerprint enrollment.
 * Maps user to R503 sensor slot ID for verification. Supports archiving:
 * templateBackup stores downloaded template when slot freed, r503SlotId null
 * when archived. Validation enforced via FingerprintValidator.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.core;

import java.time.Instant;

public record Fingerprint(
    Long id,
    Long userId,
    Integer r503SlotId,
    byte[] templateBackup,
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
    return isActive() && r503SlotId != null;
  }

  public boolean hasBackup() {
    return templateBackup != null && templateBackup.length > 0;
  }
}
