/*
 * File: FingerprintValidator.java
 * Purpose: Validates fingerprint business invariants including R503 slot ID
 * constraints and user association requirements. Supports validation for both
 * active enrollment and archived template restoration scenarios.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

public class FingerprintValidator {

  public static void validateEnrollment(Long userId, Integer r503SlotId) {
    if (userId == null || userId <= 0) {
      throw new IllegalArgumentException("error.fingerprint.userId.required");
    }

    if (r503SlotId == null || r503SlotId < 0) {
      throw new IllegalArgumentException("error.fingerprint.slotId.required");
    }

    if (r503SlotId > 1499) {
      throw new IllegalArgumentException(
          "error.fingerprint.slotId.outOfRange");
    }
  }

  public static void validateStatus(FingerprintStatus status) {
    if (status == null) {
      throw new IllegalArgumentException("error.fingerprint.status.required");
    }
  }

  public static void validateTemplateBackup(byte[] templateBackup) {
    if (templateBackup == null || templateBackup.length == 0) {
      throw new IllegalArgumentException(
          "error.fingerprint.backup.required");
    }

    if (templateBackup.length < 256 || templateBackup.length > 2048) {
      throw new IllegalArgumentException(
          "error.fingerprint.backup.invalidSize");
    }
  }
}
