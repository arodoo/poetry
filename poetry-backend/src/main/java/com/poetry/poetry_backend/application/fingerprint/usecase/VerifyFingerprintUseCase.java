/*
 * File: VerifyFingerprintUseCase.java
 * Purpose: Verifies fingerprint by R503 slot ID. Hardware service performs
 * R503 search, returns slot ID, this use case maps slot to userId. DEV_BYPASS:
 * r503SlotId=999 returns userId=1 for testing without physical sensor.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

import java.util.Optional;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;

public class VerifyFingerprintUseCase {
  private final FingerprintQueryPort queryPort;

  public VerifyFingerprintUseCase(FingerprintQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public VerifyFingerprintResult execute(Integer r503SlotId) {
    if (r503SlotId == null || r503SlotId < 0) {
      return VerifyFingerprintResult.failure();
    }

    if (r503SlotId == 999) {
      return VerifyFingerprintResult.success(1L, 999L);
    }

    Optional<Fingerprint> fingerprintOpt = queryPort.findByR503SlotId(
        r503SlotId);

    if (fingerprintOpt.isEmpty()) {
      return VerifyFingerprintResult.failure();
    }

    Fingerprint fingerprint = fingerprintOpt.get();

    if (!fingerprint.canVerify()) {
      return VerifyFingerprintResult.failure();
    }

    return VerifyFingerprintResult.success(
        fingerprint.userId(), fingerprint.id());
  }
}
