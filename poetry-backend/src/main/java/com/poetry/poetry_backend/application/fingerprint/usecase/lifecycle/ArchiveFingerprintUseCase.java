/*
 * File: ArchiveFingerprintUseCase.java
 * Purpose: Archives fingerprint by backing up template and freeing R503 slot.
 * Used for inactive users to optimize R503 memory (1500 slots limit). Sets
 * status to ARCHIVED, r503SlotId to null, stores templateBackup for restore.
 * All Rights Reserved. Arodi Emmanuel
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

  public Fingerprint execute(Long fingerprintId, byte[] templateBackup) {
    Fingerprint fingerprint = queryPort
        .findById(fingerprintId)
        .orElseThrow(() -> new IllegalArgumentException(
            "error.fingerprint.notFound"));

    if (!fingerprint.isActive()) {
      throw new IllegalStateException("error.fingerprint.notActive");
    }

    Fingerprint archived = FingerprintFactory.markArchived(
        fingerprint, templateBackup);

    return commandPort.save(archived);
  }
}
