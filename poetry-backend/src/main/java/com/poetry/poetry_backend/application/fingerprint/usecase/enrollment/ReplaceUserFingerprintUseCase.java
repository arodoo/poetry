/*
 * File: ReplaceUserFingerprintUseCase.java
 * Purpose: Replaces all active fingerprints for a user with a new one.
 * Deletes existing active enrollments before saving the new FMD template.
 * All Rights Reserved Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.fingerprint.usecase.enrollment;

import java.util.List;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintFactory;

public class ReplaceUserFingerprintUseCase {
  private final FingerprintQueryPort queryPort;
  private final FingerprintCommandPort commandPort;

  public ReplaceUserFingerprintUseCase(
      FingerprintQueryPort queryPort,
      FingerprintCommandPort commandPort) {
    this.queryPort = queryPort;
    this.commandPort = commandPort;
  }

  public Fingerprint execute(Long userId, String fmd) {
    List<Fingerprint> existing = queryPort.findActiveByUserId(userId);
    existing.forEach(fp -> commandPort.deleteById(fp.id()));
    Fingerprint newFp = FingerprintFactory.createNew(userId, fmd);
    return commandPort.save(newFp);
  }
}
