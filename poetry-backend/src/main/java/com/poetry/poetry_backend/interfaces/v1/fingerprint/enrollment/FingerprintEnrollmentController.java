/*
 * File: FingerprintEnrollmentController.java
 * Purpose: REST endpoint for fingerprint enrollment wizard.
 * Auto-assigns slot and links fingerprint to user.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.enrollment;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.fingerprint.usecase.enrollment.EnrollFingerprintForUserUseCase;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/users/{userId}/fingerprints")
@Tag(name = "Fingerprint Enrollment", description = "Fingerprint wizard")
public class FingerprintEnrollmentController {
  private final EnrollFingerprintForUserUseCase enrollUseCase;

  public FingerprintEnrollmentController(
      EnrollFingerprintForUserUseCase enrollUseCase) {
    this.enrollUseCase = enrollUseCase;
  }

  @Operation(
      operationId = "enrollFingerprintForUser",
      summary = "Enroll fingerprint with auto-assigned slot",
      description =
          "Auto-assigns first available slot (0-1500) and links to user")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "201", description = "Enrolled"),
        @ApiResponse(responseCode = "400", description = "No slots available"),
        @ApiResponse(responseCode = "401", description = "Unauthorized"),
        @ApiResponse(responseCode = "403", description = "Forbidden")
      })
  @PreAuthorize("hasAuthority('admin')")
  @PostMapping("/enroll")
  public ResponseEntity<FingerprintEnrollmentResponse> enrollForUser(
      @PathVariable Long userId) {
    Fingerprint fingerprint = enrollUseCase.execute(userId);
    return ResponseEntity.status(201)
        .body(
            new FingerprintEnrollmentResponse(
                fingerprint.id(),
                fingerprint.r503SlotId(),
                "ENROLLED"));
  }

  public record FingerprintEnrollmentResponse(
      Long fingerprintId, Integer slotId, String status) {}
}
