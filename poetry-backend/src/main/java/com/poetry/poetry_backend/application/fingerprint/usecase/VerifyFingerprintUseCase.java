/*
 * File: VerifyFingerprintUseCase.java
 * Purpose: Verifies fingerprint by matching probe FMD against enrolled FMDs.
 * Uses SourceAFIS for server-side matching with a quality threshold.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;

public class VerifyFingerprintUseCase {
  private final FingerprintQueryPort queryPort;

  public VerifyFingerprintUseCase(FingerprintQueryPort queryPort) {
    this.queryPort = queryPort;
  }

  public VerifyFingerprintResult execute(String fmd) {
    if (fmd == null || fmd.isBlank()) {
      return VerifyFingerprintResult.failure();
    }

    return verifyWithFmd(fmd);
  }

  private VerifyFingerprintResult verifyWithFmd(String fmd) {
    try {
      byte[] probeBytes = java.util.Base64.getDecoder().decode(fmd);
      var probe = new com.machinezoo.sourceafis.FingerprintTemplate(probeBytes);

      var candidates = queryPort.findActiveWithFmd();

      var matcher = new com.machinezoo.sourceafis.FingerprintMatcher(probe);

      double threshold = 40.0;
      Fingerprint bestMatch = null;
      double bestScore = 0.0;

      for (Fingerprint candidate : candidates) {
        if (candidate.fmd() == null)
          continue;
        byte[] candidateBytes = java.util.Base64.getDecoder().decode(candidate.fmd());
        var candidateTemplate = new com.machinezoo.sourceafis.FingerprintTemplate(candidateBytes);

        double score = matcher.match(candidateTemplate);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = candidate;
        }
      }

      if (bestScore >= threshold && bestMatch != null) {
        return VerifyFingerprintResult.success(bestMatch.userId(), bestMatch.id());
      }

      return VerifyFingerprintResult.failure();

    } catch (IllegalArgumentException e) {
      return VerifyFingerprintResult.failure();
    }
  }
}
