/*
 * File: DeleteFingerprintUseCase.java
 * Purpose: Performs soft delete of fingerprint enrollment record by setting
 * deletedAt timestamp. Also deletes template from R503 hardware to free slot.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle;

import java.util.List;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.HardwareServicePort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;

public class DeleteFingerprintUseCase {
  private final FingerprintCommandPort commandPort;
  private final FingerprintQueryPort queryPort;
  private final HardwareServicePort hardwarePort;

  public DeleteFingerprintUseCase(
      FingerprintCommandPort commandPort,
      FingerprintQueryPort queryPort,
      HardwareServicePort hardwarePort) {
    this.commandPort = commandPort;
    this.queryPort = queryPort;
    this.hardwarePort = hardwarePort;
  }

  public void execute(Long id) {
    Fingerprint fingerprint = queryPort
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException(
            "error.fingerprint.notFound"));

    // Delete from hardware first
    if (fingerprint.r503SlotId() != null) {
      hardwarePort.deleteTemplates(List.of(fingerprint.r503SlotId()));
    }

    commandPort.deleteById(id);
  }
}
