/*
 * File: Fingerprint.java
 * Purpose: Immutable aggregate root representing a fingerprint enrollment
 * record. Contains user association, template data (base64 encoded binary),
 * and status for access control. Validation enforced via FingerprintValidator.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import java.time.Instant;

public record Fingerprint(
    Long id,
    Long userId,
    String templateData,
    FingerprintStatus status,
    Instant enrolledAt,
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

  public boolean canVerify() {
    return isActive();
  }
}
