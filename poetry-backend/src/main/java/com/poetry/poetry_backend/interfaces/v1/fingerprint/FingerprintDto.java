/*
 * File: FingerprintDto.java
 * Purpose: DTO classes for fingerprint enrollment and verification endpoints
 * separating API contracts from domain model. Includes security-sensitive
 * template data and verification result representations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint;

import java.time.Instant;

import com.poetry.poetry_backend.domain.fingerprint.model.Fingerprint;

import io.swagger.v3.oas.annotations.media.Schema;

public final class FingerprintDto {

  @Schema(description = "Fingerprint enrollment response")
  public record FingerprintResponse(
      @Schema(description = "Fingerprint ID", example = "1") Long id,
      @Schema(description = "User ID", example = "123") Long userId,
      @Schema(description = "Enrollment status", example = "ACTIVE") String status,
      @Schema(description = "Enrollment timestamp") Instant enrolledAt,
      @Schema(description = "Version", example = "1") Long version) {}

  @Schema(description = "Fingerprint enrollment request")
  public record EnrollRequest(
      @Schema(
              description = "Fingerprint template data (base64)",
              requiredMode = Schema.RequiredMode.REQUIRED)
          String templateData) {}

  @Schema(description = "Fingerprint verification request")
  public record VerifyRequest(
      @Schema(
              description = "Captured fingerprint data (base64)",
              requiredMode = Schema.RequiredMode.REQUIRED)
          String capturedTemplate) {}

  @Schema(description = "Fingerprint verification response")
  public record VerifyResponse(
      @Schema(description = "Verification success", example = "true") boolean matched,
      @Schema(description = "Matched user ID (if success)", example = "123") Long userId,
      @Schema(description = "Matched fingerprint ID", example = "5") Long fingerprintId,
      @Schema(description = "Result message key", example = "verification.success")
          String message) {}

  public static FingerprintResponse toResponse(Fingerprint f) {
    return new FingerprintResponse(
        f.id(), f.userId(), f.status().name(), f.enrolledAt(), f.version());
  }
}
