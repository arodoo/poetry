/*
 * File: FingerprintsListController.java
 * Purpose: Provides endpoint to list all enrolled fingerprints for administrative
 * viewing and audit purposes. Returns fingerprint metadata excluding sensitive
 * template data for security.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.crud;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.fingerprint.usecase.query.GetAllFingerprintsUseCase;
import com.poetry.poetry_backend.interfaces.v1.fingerprint.dto.FingerprintDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints", description = "Fingerprint management")
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintsListController {
  private final GetAllFingerprintsUseCase getAllUseCase;

  public FingerprintsListController(GetAllFingerprintsUseCase getAllUseCase) {
    this.getAllUseCase = getAllUseCase;
  }

  @Operation(
      operationId = "listFingerprints",
      summary = "List all fingerprints",
      description = "Retrieve enrolled fingerprints")
  @ApiResponse(responseCode = "200", description = "Success")
  @PreAuthorize("isAuthenticated()")
  @GetMapping
  public ResponseEntity<List<FingerprintDto.FingerprintResponse>> list() {
    var fingerprints = getAllUseCase.execute();

    var responses = fingerprints.stream()
        .map(FingerprintDto::toResponse)
        .toList();

    return ResponseEntity.ok(responses);
  }
}
