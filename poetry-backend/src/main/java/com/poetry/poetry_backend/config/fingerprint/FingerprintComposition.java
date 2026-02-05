/*
 * File: FingerprintComposition.java
 * Purpose: Composition root for Fingerprint enrollment use cases.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.fingerprint;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.application.fingerprint.usecase.enrollment.EnrollFingerprintUseCase;

@Configuration
public class FingerprintComposition {

  @Bean
  public EnrollFingerprintUseCase enrollFingerprintUseCase(
      FingerprintCommandPort cmd) {
    return new EnrollFingerprintUseCase(cmd);
  }
}
