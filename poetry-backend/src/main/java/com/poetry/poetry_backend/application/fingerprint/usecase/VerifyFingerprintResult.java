/*
 * File: VerifyFingerprintResult.java
 * Purpose: Value object encapsulating fingerprint verification outcome with
 * matched user identification and confidence metadata. Used to determine
 * access control decisions and relay activation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase;

public record VerifyFingerprintResult(
    boolean matched,
    Long userId,
    Long fingerprintId,
    String message) {

  public static VerifyFingerprintResult success(
      Long userId, Long fingerprintId) {
    return new VerifyFingerprintResult(
        true, userId, fingerprintId, "verification.success");
  }

  public static VerifyFingerprintResult failure() {
    return new VerifyFingerprintResult(
        false, null, null, "verification.noMatch");
  }
}
