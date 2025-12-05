/*
 * File: GetFingerprintByIdUseCase.java
 * Purpose: Retrieves single fingerprint by identifier for detail view or
 * verification audit trail. Throws exception if not found per domain rules.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.query;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;

public class GetFingerprintByIdUseCase {
  private final FingerprintQueryPort queryPort;

  public GetFingerprintByIdUseCase(FingerprintQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public Fingerprint execute(Long id) {
    return queryPort
        .findById(id)
        .orElseThrow(() -> new IllegalArgumentException(
            "error.fingerprint.notFound"));
  }
}
