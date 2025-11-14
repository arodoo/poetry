/*
 * File: FingerprintValidator.java
 * Purpose: Validates fingerprint business invariants including template data
 * format constraints and user association requirements. Throws domain
 * exceptions with i18n keys for consistent error messaging.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

public class FingerprintValidator {

  public static void validateEnrollment(Long userId, String templateData) {
    if (userId == null || userId <= 0) {
      throw new IllegalArgumentException("error.fingerprint.userId.required");
    }

    if (templateData == null || templateData.isBlank()) {
      throw new IllegalArgumentException("error.fingerprint.template.required");
    }

    if (templateData.length() < 10) {
      throw new IllegalArgumentException(
          "error.fingerprint.template.tooShort");
    }

    if (templateData.length() > 5000) {
      throw new IllegalArgumentException(
          "error.fingerprint.template.tooLarge");
    }
  }

  public static void validateStatus(FingerprintStatus status) {
    if (status == null) {
      throw new IllegalArgumentException("error.fingerprint.status.required");
    }
  }
}
