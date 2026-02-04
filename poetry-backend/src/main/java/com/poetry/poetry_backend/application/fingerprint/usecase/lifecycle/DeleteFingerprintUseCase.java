/*
 * File: DeleteFingerprintUseCase.java
 * Purpose: Performs soft delete of fingerprint enrollment record by setting
 * deletedAt timestamp. No hardware cleanup needed for HID readers as
 * templates are stored exclusively in the server-side database.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;

public class DeleteFingerprintUseCase {
  private final FingerprintCommandPort commandPort;
  private final FingerprintQueryPort queryPort;

  public DeleteFingerprintUseCase(
      FingerprintCommandPort commandPort,
      FingerprintQueryPort queryPort) {
    this.commandPort = commandPort;
    this.queryPort = queryPort;
  }

  public void execute(Long id) {
    queryPort
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException(
            "error.fingerprint.notFound"));

    commandPort.deleteById(id);
  }
}
