/*
 * File: FingerprintFactory.java
 * Purpose: Factory for creating new Fingerprint aggregate instances with
 * validation enforcement. Ensures all enrollment operations produce valid
 * domain objects before persistence.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import java.time.Instant;

public class FingerprintFactory {

  public static Fingerprint createNew(Long userId, String templateData) {
    FingerprintValidator.validateEnrollment(userId, templateData);

    Instant now = Instant.now();

    return new Fingerprint(
        null,
        userId,
        templateData,
        FingerprintStatus.ACTIVE,
        now,
        now,
        now,
        null,
        0L);
  }

  public static Fingerprint markInactive(Fingerprint fingerprint) {
    return new Fingerprint(
        fingerprint.id(),
        fingerprint.userId(),
        fingerprint.templateData(),
        FingerprintStatus.INACTIVE,
        fingerprint.enrolledAt(),
        fingerprint.createdAt(),
        Instant.now(),
        fingerprint.deletedAt(),
        fingerprint.version() + 1);
  }
}
