/*
 * File: FingerprintDto.java
 * Purpose: DTO classes for fingerprint enrollment and verification endpoints.
 * Uses R503 slot IDs instead of raw template data. Verification request
 * receives slot ID from hardware service after R503 search operation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.dto;

import java.time.Instant;

import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;

import io.swagger.v3.oas.annotations.media.Schema;

public final class FingerprintDto {

  @Schema(description = "Fingerprint enrollment response")
  public record FingerprintResponse(
      @Schema(description = "Fingerprint ID", example = "1") Long id,
      @Schema(description = "User ID", example = "123") Long userId,
      @Schema(description = "R503 slot ID", example = "45") Integer r503SlotId,
      @Schema(description = "Enrollment status", example = "ACTIVE") String status,
      @Schema(description = "Enrollment timestamp") Instant enrolledAt,
      @Schema(description = "Archived timestamp") Instant archivedAt,
      @Schema(description = "Version", example = "1") Long version) {}

  @Schema(description = "Fingerprint enrollment request")
  public record EnrollRequest(
      @Schema(
              description = "R503 slot ID assigned by hardware",
              requiredMode = Schema.RequiredMode.REQUIRED,
              example = "45")
          Integer r503SlotId) {}

  @Schema(description = "Fingerprint verification request")
  public record VerifyRequest(
      @Schema(
              description = "R503 slot ID from hardware search",
              requiredMode = Schema.RequiredMode.REQUIRED,
              example = "45")
          Integer r503SlotId) {}

  @Schema(description = "Fingerprint verification response")
  public record VerifyResponse(
      @Schema(description = "Verification success", example = "true") boolean matched,
      @Schema(description = "Matched user ID (if success)", example = "123") Long userId,
      @Schema(description = "Matched fingerprint ID", example = "5") Long fingerprintId,
      @Schema(description = "Result message key", example = "verification.success")
          String message) {}

  @Schema(description = "Archive fingerprint request")
  public record ArchiveRequest(
      @Schema(
              description = "Template backup from R503 download",
              requiredMode = Schema.RequiredMode.REQUIRED)
          byte[] templateBackup) {}

  @Schema(description = "Restore fingerprint request")
  public record RestoreRequest(
      @Schema(
              description = "New R503 slot ID for restoration",
              requiredMode = Schema.RequiredMode.REQUIRED,
              example = "120")
          Integer newR503SlotId) {}

  public static FingerprintResponse toResponse(Fingerprint f) {
    return new FingerprintResponse(
        f.id(),
        f.userId(),
        f.r503SlotId(),
        f.status().name(),
        f.enrolledAt(),
        f.archivedAt(),
        f.version());
  }
}
