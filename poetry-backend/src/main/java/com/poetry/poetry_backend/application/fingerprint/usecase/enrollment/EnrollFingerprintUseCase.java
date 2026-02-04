/*
 * File: EnrollFingerprintUseCase.java
 * Purpose: Orchestrates fingerprint enrollment for HID Digital Persona readers.
 * Saves Fingerprint Minutiae Data (FMD) for server-side verification.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.enrollment;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintFactory;

public class EnrollFingerprintUseCase {
  private final FingerprintCommandPort commandPort;

  public EnrollFingerprintUseCase(
      FingerprintCommandPort commandPort) {
    this.commandPort = commandPort;
  }

  public Fingerprint execute(Long userId, String fmd) {
    Fingerprint newFingerprint = FingerprintFactory.createNew(userId, fmd);
    return commandPort.save(newFingerprint);
  }
}
