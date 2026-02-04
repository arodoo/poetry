/*
 * File: RestoreFingerprintUseCase.java
 * Purpose: Restores archived fingerprint to active status.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintFactory;

public class RestoreFingerprintUseCase {
  private final FingerprintCommandPort commandPort;
  private final FingerprintQueryPort queryPort;

  public RestoreFingerprintUseCase(
      FingerprintCommandPort commandPort,
      FingerprintQueryPort queryPort) {
    this.commandPort = commandPort;
    this.queryPort = queryPort;
  }

  public Fingerprint execute(Long fingerprintId) {
    Fingerprint fingerprint = queryPort
        .findById(fingerprintId)
        .orElseThrow(() -> new IllegalArgumentException(
            "error.fingerprint.notFound"));

    if (!fingerprint.isArchived()) {
      throw new IllegalStateException("error.fingerprint.notArchived");
    }

    Fingerprint restored = FingerprintFactory.restoreFromArchive(fingerprint);

    return commandPort.save(restored);
  }
}
