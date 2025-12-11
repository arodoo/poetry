/*
 * File: RestoreFingerprintUseCase.java
 * Purpose: Restores archived fingerprint to active status with new R503 slot.
 * Finds available slot, uploads templateBackup to R503 via hardware service,
 * assigns new slot ID, sets status ACTIVE. Used for returning users.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintFactory;

public class RestoreFingerprintUseCase {
  private final FingerprintCommandPort commandPort;
  private final FingerprintQueryPort queryPort;
  private final HardwareServicePort hardwarePort;

  public RestoreFingerprintUseCase(
      FingerprintCommandPort commandPort,
      FingerprintQueryPort queryPort,
      HardwareServicePort hardwarePort) {
    this.commandPort = commandPort;
    this.queryPort = queryPort;
    this.hardwarePort = hardwarePort;
  }

  public Fingerprint execute(Long fingerprintId) {
    Fingerprint fingerprint = queryPort
        .findById(fingerprintId)
        .orElseThrow(() -> new IllegalArgumentException(
            "error.fingerprint.notFound"));

    validateCanRestore(fingerprint);

    int newSlotId = hardwarePort.findAvailableSlot();

    boolean uploaded = hardwarePort.uploadTemplate(
        newSlotId, fingerprint.templateBackup());
    if (!uploaded) {
      throw new IllegalStateException("error.fingerprint.uploadFailed");
    }

    Fingerprint restored = FingerprintFactory.restoreFromArchive(
        fingerprint, newSlotId);

    return commandPort.save(restored);
  }

  private void validateCanRestore(Fingerprint fp) {
    if (!fp.isArchived()) {
      throw new IllegalStateException("error.fingerprint.notArchived");
    }
    if (!fp.hasBackup()) {
      throw new IllegalStateException("error.fingerprint.noBackup");
    }
  }
}
