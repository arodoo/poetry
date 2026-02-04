/*
 * File: ArchiveFingerprintUseCase.java
 * Purpose: Archives fingerprint by changing status to ARCHIVED.
 * Used for inactive users to clear from active monitoring without deletion.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintFactory;

public class ArchiveFingerprintUseCase {
  private final FingerprintCommandPort commandPort;
  private final FingerprintQueryPort queryPort;

  public ArchiveFingerprintUseCase(
      FingerprintCommandPort commandPort, FingerprintQueryPort queryPort) {
    this.commandPort = commandPort;
    this.queryPort = queryPort;
  }

  public Fingerprint execute(Long fingerprintId) {
    Fingerprint fingerprint = queryPort
        .findById(fingerprintId)
        .orElseThrow(() -> new IllegalArgumentException(
            "error.fingerprint.notFound"));

    if (!fingerprint.isActive()) {
      throw new IllegalStateException("error.fingerprint.notActive");
    }

    Fingerprint archived = FingerprintFactory.markArchived(fingerprint);

    return commandPort.save(archived);
  }
}
