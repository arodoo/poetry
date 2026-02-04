/*
 * File: FingerprintCreator.java
 * Purpose: Creates new Fingerprint instances during enrollment for HID readers.
 * Enforces domain invariants for userId and FMD presence.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.lifecycle;

import java.time.Instant;

import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

public class FingerprintCreator {

  public static Fingerprint createNew(Long userId, String fmd) {
    Instant now = Instant.now();

    return new Fingerprint(
        null,
        userId,
        fmd,
        FingerprintStatus.ACTIVE,
        now,
        null,
        now,
        now,
        now,
        null,
        0L);
  }

  public static Fingerprint markInactive(Fingerprint fingerprint) {
    return new Fingerprint(
        fingerprint.id(),
        fingerprint.userId(),
        fingerprint.fmd(),
        FingerprintStatus.INACTIVE,
        fingerprint.enrolledAt(),
        fingerprint.archivedAt(),
        fingerprint.lastActivityAt(),
        fingerprint.createdAt(),
        Instant.now(),
        fingerprint.deletedAt(),
        fingerprint.version() + 1);
  }
}
