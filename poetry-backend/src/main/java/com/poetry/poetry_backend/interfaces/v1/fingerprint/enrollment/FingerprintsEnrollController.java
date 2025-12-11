/*
 * File: FingerprintsEnrollController.java
 * Purpose: Provides fingerprint enrollment endpoint for authenticated users.
 * Captures template data from hardware service and persists association with
 * current user for future verification.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.enrollment;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.fingerprint.usecase.enrollment.EnrollFingerprintUseCase;
import com.poetry.poetry_backend.interfaces.v1.fingerprint.dto.FingerprintDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints", description = "Fingerprint enrollment")
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintsEnrollController {
  private final EnrollFingerprintUseCase enrollUseCase;

  public FingerprintsEnrollController(EnrollFingerprintUseCase enrollUseCase) {
    this.enrollUseCase = enrollUseCase;
  }

  @Operation(operationId = "enrollFingerprint", summary = "Enroll a new fingerprint", // i18n-ignore
      description = "Register fingerprint with R503 slot ID from hardware service") // i18n-ignore
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Enrolled successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid slot ID"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @PreAuthorize("isAuthenticated()")
  @PostMapping("/enroll")
  public ResponseEntity<FingerprintDto.FingerprintResponse> enroll(
      @RequestBody FingerprintDto.EnrollRequest request, Authentication auth) {

    Long userId = Long.parseLong(auth.getName());
    var fingerprint = enrollUseCase.execute(userId, request.r503SlotId());

    return ResponseEntity.status(201).body(FingerprintDto.toResponse(fingerprint));
  }
}
