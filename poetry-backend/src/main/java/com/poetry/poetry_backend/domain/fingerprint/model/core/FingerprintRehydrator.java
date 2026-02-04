/*
 * File: FingerprintRehydrator.java
 * Purpose: Reconstructs Fingerprint aggregates from persistence layer without
 * validation enforcement. Used exclusively by infrastructure adapters to
 * restore previously validated domain objects for HID readers.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.core;

import java.time.Instant;

public class FingerprintRehydrator {

  public static Fingerprint rehydrate(
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
      Long version) {

    return new Fingerprint(
        id,
        userId,
        fmd,
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
