/*
 * File: FingerprintRehydrator.java
 * Purpose: Reconstructs Fingerprint aggregates from persistence layer without
 * validation enforcement. Used exclusively by infrastructure adapters to
 * restore previously validated domain objects with R503 slot mapping.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import java.time.Instant;

public class FingerprintRehydrator {

  public static Fingerprint rehydrate(
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
      Long version) {

    return new Fingerprint(
        id,
        userId,
        r503SlotId,
        templateBackup,
        status,
        enrolledAt,
        archivedAt,
        lastActivityAt,
        createdAt,
        updatedAt,
        deletedAt,
        version);
  }
}
