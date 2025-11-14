/*
 * File: DeleteFingerprintUseCase.java
 * Purpose: Performs soft delete of fingerprint enrollment record by setting
 * deletedAt timestamp. Prevents further verification attempts while maintaining
 * audit history.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;

public class DeleteFingerprintUseCase {
  private final FingerprintCommandPort commandPort;
  private final FingerprintQueryPort queryPort;

  public DeleteFingerprintUseCase(
      FingerprintCommandPort commandPort, FingerprintQueryPort queryPort) {
    this.commandPort = commandPort;
    this.queryPort = queryPort;
  }

  public void execute(Long id) {
    Fingerprint fingerprint = queryPort
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException(
            "error.fingerprint.notFound"));

    commandPort.deleteById(id);
  }
}
