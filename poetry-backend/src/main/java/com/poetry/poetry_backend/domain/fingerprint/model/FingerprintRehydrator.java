/*
 * File: FingerprintRehydrator.java
 * Purpose: Reconstructs Fingerprint aggregates from persistence layer without
 * validation enforcement. Used exclusively by infrastructure adapters to
 * restore previously validated domain objects.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import java.time.Instant;

public class FingerprintRehydrator {

  public static Fingerprint rehydrate(
      Long id,
      Long userId,
      String templateData,
      FingerprintStatus status,
      Instant enrolledAt,
      Instant createdAt,
      Instant updatedAt,
      Instant deletedAt,
      Long version) {

    return new Fingerprint(
        id,
        userId,
        templateData,
        status,
        enrolledAt,
        createdAt,
        updatedAt,
        deletedAt,
        version);
  }
}
