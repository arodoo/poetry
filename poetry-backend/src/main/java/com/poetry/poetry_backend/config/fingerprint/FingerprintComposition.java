/*
 * File: FingerprintComposition.java
 * Purpose: Composition root for Fingerprint enrollment use cases.
 * Wires EnrollFingerprintUseCase and ReplaceUserFingerprintUseCase.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.fingerprint;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.application.fingerprint.usecase.enrollment.EnrollFingerprintUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.enrollment.ReplaceUserFingerprintUseCase;

@Configuration
public class FingerprintComposition {

  @Bean
  public EnrollFingerprintUseCase enrollFingerprintUseCase(
      FingerprintCommandPort cmd) {
    return new EnrollFingerprintUseCase(cmd);
  }

  @Bean
  public ReplaceUserFingerprintUseCase replaceUserFingerprintUseCase(
      FingerprintQueryPort query, FingerprintCommandPort cmd) {
    return new ReplaceUserFingerprintUseCase(query, cmd);
  }
}
