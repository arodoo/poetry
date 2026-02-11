/*
 * File: FingerprintsEnrollController.java
 * Purpose: REST endpoint for enrolling fingerprints.
 * Registers fingerprint with R503 slot ID from hardware service.
 * Creates new fingerprint record for authentication purposes.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.fingerprint.usecase.enrollment.EnrollFingerprintUseCase;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.interfaces.v1.fingerprint.dto.FingerprintDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/fingerprints")
@Tag(name = "fingerprints", description = "Fingerprint enrollment")
public class FingerprintsEnrollController {
  private final EnrollFingerprintUseCase enrollUseCase;

  public FingerprintsEnrollController(
      EnrollFingerprintUseCase enrollUseCase) {
    this.enrollUseCase = enrollUseCase;
  }

  @Operation(
      operationId = "enrollFingerprint",
      summary = "Enroll a new fingerprint",
      description = "Register fingerprint with R503 slot ID from hardware service")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Enrolled successfully"),
      @ApiResponse(responseCode = "400", description = "Invalid slot ID"),
      @ApiResponse(responseCode = "401", description = "Unauthorized")
  })
  @PreAuthorize("hasAuthority('admin')")
  @PostMapping("/enroll")
  public ResponseEntity<FingerprintDto.FingerprintResponse> enroll(
      @RequestBody FingerprintDto.EnrollRequest request) {
    Fingerprint fp = enrollUseCase.execute(null, request.fmd());
    return ResponseEntity.status(201)
        .body(FingerprintDto.toResponse(fp));
  }
}
