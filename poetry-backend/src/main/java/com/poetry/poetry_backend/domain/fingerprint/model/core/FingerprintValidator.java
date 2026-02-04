/*
 * File: FingerprintValidator.java
 * Purpose: Validates fingerprint business invariants for HID Digital Persona.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model.core;

public class FingerprintValidator {

  public static void validateUserId(Long userId) {
    if (userId == null || userId <= 0) {
      throw new IllegalArgumentException("error.fingerprint.userId.required");
    }
  }

  public static void validateFmd(String fmd) {
    if (fmd == null || fmd.isEmpty()) {
      throw new IllegalArgumentException("error.fingerprint.fmd.required");
    }
  }

  public static void validateStatus(FingerprintStatus status) {
    if (status == null) {
      throw new IllegalArgumentException("error.fingerprint.status.required");
    }
  }
}
