/*
 * File: GetAllFingerprintsUseCase.java
 * Purpose: Retrieves all enrolled fingerprints for administrative viewing
 * and audit purposes. Excludes soft-deleted records per repository filter.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.query;

import java.util.List;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;

public class GetAllFingerprintsUseCase {
  private final FingerprintQueryPort queryPort;

  public GetAllFingerprintsUseCase(FingerprintQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public List<Fingerprint> execute() {
    return queryPort.findAll();
  }
}
