/*
 * File: FingerprintArchiver.java
 * Purpose: Handles fingerprint archiving and restoration.
 * Archives active fingerprints by changing status, restores by reactivating.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.lifecycle;

import java.time.Instant;

import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

public class FingerprintArchiver {

  public static Fingerprint markArchived(Fingerprint fingerprint) {
    Instant now = Instant.now();

    return new Fingerprint(
        fingerprint.id(),
        fingerprint.userId(),
        fingerprint.fmd(),
        FingerprintStatus.ARCHIVED,
        fingerprint.enrolledAt(),
        now,
        fingerprint.lastActivityAt(),
        fingerprint.createdAt(),
        now,
        fingerprint.deletedAt(),
        fingerprint.version() + 1);
  }

  public static Fingerprint restoreFromArchive(Fingerprint fingerprint) {
    if (!fingerprint.isArchived()) {
      throw new IllegalStateException("error.fingerprint.notArchived");
    }

    Instant now = Instant.now();

    return new Fingerprint(
        fingerprint.id(),
        fingerprint.userId(),
        fingerprint.fmd(),
        FingerprintStatus.ACTIVE,
        fingerprint.enrolledAt(),
        null,
        now,
        fingerprint.createdAt(),
        now,
        fingerprint.deletedAt(),
        fingerprint.version() + 1);
  }
}
