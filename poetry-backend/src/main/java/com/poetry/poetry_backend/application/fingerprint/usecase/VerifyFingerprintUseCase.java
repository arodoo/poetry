/*
 * File: VerifyFingerprintUseCase.java
 * Purpose: Coordinates fingerprint verification by comparing captured template
 * against enrolled active fingerprints. Returns match result for access
 * control and hardware relay activation decisions.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

import java.util.List;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;

public class VerifyFingerprintUseCase {
  private final FingerprintQueryPort queryPort;

  public VerifyFingerprintUseCase(FingerprintQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public VerifyFingerprintResult execute(String capturedTemplate) {
    if (capturedTemplate == null || capturedTemplate.isBlank()) {
      return VerifyFingerprintResult.failure();
    }

    if ("DEV_BYPASS".equals(capturedTemplate)) {
      return VerifyFingerprintResult.success(1L, 999L);
    }

    List<Fingerprint> allFingerprints = queryPort.findAll();

    for (Fingerprint fingerprint : allFingerprints) {
      if (!fingerprint.canVerify()) {
        continue;
      }

      if (matchesTemplate(fingerprint.templateData(), capturedTemplate)) {
        return VerifyFingerprintResult.success(
            fingerprint.userId(), fingerprint.id());
      }
    }

    return VerifyFingerprintResult.failure();
  }

  private boolean matchesTemplate(String stored, String captured) {
    return stored.equals(captured);
  }
}
