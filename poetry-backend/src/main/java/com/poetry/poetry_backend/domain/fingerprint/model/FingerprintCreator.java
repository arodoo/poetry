/*
 * File: FingerprintCreator.java
 * Purpose: Creates new Fingerprint instances during enrollment with R503
 * slot validation. Enforces domain invariants for userId and slot range.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import java.time.Instant;

public class FingerprintCreator {

  public static Fingerprint createNew(Long userId, Integer r503SlotId) {
    FingerprintValidator.validateEnrollment(userId, r503SlotId);

    Instant now = Instant.now();

    return new Fingerprint(
        null,
        userId,
        r503SlotId,
        null,
        FingerprintStatus.ACTIVE,
        now,
        null,
        now,
        now,
        null,
        0L);
  }

  public static Fingerprint markInactive(Fingerprint fingerprint) {
    return new Fingerprint(
        fingerprint.id(),
        fingerprint.userId(),
        fingerprint.r503SlotId(),
        fingerprint.templateBackup(),
        FingerprintStatus.INACTIVE,
        fingerprint.enrolledAt(),
        fingerprint.archivedAt(),
        fingerprint.createdAt(),
        Instant.now(),
        fingerprint.deletedAt(),
        fingerprint.version() + 1);
  }
}
