/*
 * File: FingerprintArchiver.java
 * Purpose: Handles fingerprint archiving and restoration. Archives active
 * fingerprints with template backup, restores from archive to new R503 slot.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.lifecycle;

import java.time.Instant;

public class FingerprintArchiver {

  public static Fingerprint markArchived(
      Fingerprint fingerprint, byte[] templateBackup) {
    FingerprintValidator.validateTemplateBackup(templateBackup);
    Instant now = Instant.now();

    return new Fingerprint(
        fingerprint.id(),
        fingerprint.userId(),
        null,
        templateBackup,
        FingerprintStatus.ARCHIVED,
        fingerprint.enrolledAt(),
        now,
        fingerprint.lastActivityAt(),
        fingerprint.createdAt(),
        now,
        fingerprint.deletedAt(),
        fingerprint.version() + 1);
  }

  public static Fingerprint restoreFromArchive(
      Fingerprint fingerprint, Integer newR503SlotId) {
    if (!fingerprint.isArchived()) {
      throw new IllegalStateException(
          "error.fingerprint.notArchived");
    }
    if (!fingerprint.hasBackup()) {
      throw new IllegalStateException(
          "error.fingerprint.noBackup");
    }
    FingerprintValidator.validateEnrollment(
        fingerprint.userId(), newR503SlotId);

    return new Fingerprint(
        fingerprint.id(),
        fingerprint.userId(),
        newR503SlotId,
        fingerprint.templateBackup(),
        FingerprintStatus.ACTIVE,
        fingerprint.enrolledAt(),
        null,
        Instant.now(),
        fingerprint.createdAt(),
        Instant.now(),
        fingerprint.deletedAt(),
        fingerprint.version() + 1);
  }
}
