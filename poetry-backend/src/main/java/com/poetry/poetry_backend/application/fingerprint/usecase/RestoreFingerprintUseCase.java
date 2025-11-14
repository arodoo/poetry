/*
 * File: RestoreFingerprintUseCase.java
 * Purpose: Restores archived fingerprint to active status with new R503 slot.
 * Uploads templateBackup to R503, assigns new slot ID, sets status ACTIVE.
 * Used when inactive user returns and needs access restored.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintFactory;

public class RestoreFingerprintUseCase {
  private final FingerprintCommandPort commandPort;
  private final FingerprintQueryPort queryPort;

  public RestoreFingerprintUseCase(
      FingerprintCommandPort commandPort, FingerprintQueryPort queryPort) {
    this.commandPort = commandPort;
    this.queryPort = queryPort;
  }

  public Fingerprint execute(Long fingerprintId, Integer newR503SlotId) {
    Fingerprint fingerprint = queryPort
        .findById(fingerprintId)
        .orElseThrow(() -> new IllegalArgumentException(
            "error.fingerprint.notFound"));

    if (!fingerprint.isArchived()) {
      throw new IllegalStateException("error.fingerprint.notArchived");
    }

    if (!fingerprint.hasBackup()) {
      throw new IllegalStateException("error.fingerprint.noBackup");
    }

    Fingerprint restored = FingerprintFactory.restoreFromArchive(
        fingerprint, newR503SlotId);

    return commandPort.save(restored);
  }
}
