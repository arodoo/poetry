/*
 * File: EnrollFingerprintUseCase.java
 * Purpose: Orchestrates fingerprint enrollment with R503 slot assignment.
 * Receives slot ID from hardware service after successful R503 enrollment.
 * DEV_BYPASS: r503SlotId=999 for testing without physical sensor.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.FingerprintFactory;

public class EnrollFingerprintUseCase {
  private final FingerprintCommandPort commandPort;
  private final FingerprintQueryPort queryPort;

  public EnrollFingerprintUseCase(
      FingerprintCommandPort commandPort, FingerprintQueryPort queryPort) {
    this.commandPort = commandPort;
    this.queryPort = queryPort;
  }

  public Fingerprint execute(Long userId, Integer r503SlotId) {
    Fingerprint newFingerprint = FingerprintFactory.createNew(
        userId, r503SlotId);

    return commandPort.save(newFingerprint);
  }
}
