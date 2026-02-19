/*
 * File: VerifyFingerprintUseCase.java
 * Purpose: Verifies fingerprint by matching probe FMD against enrolled FMDs.
 * Uses HID SDK compare() for native ANSI_378_2004 format matching.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.port.HidCaptureException;
import com.poetry.poetry_backend.application.fingerprint.port.HidCapturePort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;

public class VerifyFingerprintUseCase {
  private static final Logger log =
      LoggerFactory.getLogger(VerifyFingerprintUseCase.class);
  private static final int MATCH_THRESHOLD = 21474;

  private final FingerprintQueryPort queryPort;
  private final HidCapturePort capturePort;

  public VerifyFingerprintUseCase(
      FingerprintQueryPort queryPort,
      HidCapturePort capturePort) {
    this.queryPort = queryPort;
    this.capturePort = capturePort;
  }

  public VerifyFingerprintResult execute(String fmd) {
    if (fmd == null || fmd.isBlank()) {
      return VerifyFingerprintResult.failure();
    }
    return verifyWithFmd(fmd);
  }

  private VerifyFingerprintResult verifyWithFmd(String fmd) {
    var candidates = queryPort.findActiveWithFmd();
    Fingerprint bestMatch = null;
    int bestScore = Integer.MAX_VALUE;

    for (Fingerprint candidate : candidates) {
      if (candidate.fmd() == null) continue;
      try {
        int score = capturePort.compare(fmd, candidate.fmd());
        if (score < bestScore) {
          bestScore = score;
          bestMatch = candidate;
        }
      } catch (HidCaptureException e) {
        log.warn("Compare error for fp {}: {}", candidate.id(), e.getMessage());
      } catch (Exception e) {
        log.error("Unexpected compare error for fp {}", candidate.id(), e);
      }
    }

    if (bestMatch != null && bestScore <= MATCH_THRESHOLD) {
      log.info("Match found: userId={} score={}", bestMatch.userId(), bestScore);
      return VerifyFingerprintResult.success(bestMatch.userId(), bestMatch.id());
    }

    log.info("No match. Best score={}", bestScore);
    return VerifyFingerprintResult.failure();
  }
}
