/*
 * File: CreateFingerprintUseCase.java
 * Purpose: Wrapper for EnrollFingerprintUseCase maintaining module structure
 * compliance. Delegates to enrollment use case for fingerprint registration.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;

public class CreateFingerprintUseCase {
  private final EnrollFingerprintUseCase enrollUseCase;

  public CreateFingerprintUseCase(EnrollFingerprintUseCase enrollUseCase) {
    this.enrollUseCase = enrollUseCase;
  }

  public Fingerprint execute(Long userId, String templateData) {
    return enrollUseCase.execute(userId, templateData);
  }
}
