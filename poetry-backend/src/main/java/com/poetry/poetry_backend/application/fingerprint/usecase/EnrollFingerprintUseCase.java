/*
 * File: EnrollFingerprintUseCase.java
 * Purpose: Orchestrates fingerprint enrollment process validating user
 * existence and creating new fingerprint record. Returns enrolled fingerprint
 * aggregate for further processing or relay activation.
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

  public Fingerprint execute(Long userId, String templateData) {
    Fingerprint newFingerprint = FingerprintFactory.createNew(
        userId, templateData);

    return commandPort.save(newFingerprint);
  }
}
