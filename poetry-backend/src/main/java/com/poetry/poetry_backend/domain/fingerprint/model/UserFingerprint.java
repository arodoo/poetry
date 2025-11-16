/*
 * File: UserFingerprint.java
 * Purpose: Domain model for user-fingerprint association.
 * Represents many-to-many relationship between users and fingerprints.
 * Tracks enrollment date and active status for lifecycle management.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.fingerprint.model;

import java.time.Instant;

public record UserFingerprint(
    Long id,
    Long userId,
    Long fingerprintId,
    Instant enrolledAt,
    boolean isActive) {

  public UserFingerprint deactivate() {
    return new UserFingerprint(id, userId, fingerprintId, enrolledAt, false);
  }

  public UserFingerprint activate() {
    return new UserFingerprint(id, userId, fingerprintId, enrolledAt, true);
  }

  public static UserFingerprint createNew(Long userId, Long fingerprintId) {
    return new UserFingerprint(
        null, userId, fingerprintId, Instant.now(), true);
  }
}
