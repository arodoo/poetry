/*
 * File: FingerprintsGetController.java
 * Purpose: Get single fingerprint by ID for detail view operations.
 * Delegates to GetFingerprintByIdUseCase for fingerprint retrieval.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.fingerprint.usecase.query.GetFingerprintByIdUseCase;
import com.poetry.poetry_backend.interfaces.v1.fingerprint.dto.FingerprintDto;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints")
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintsGetController {
  private final GetFingerprintByIdUseCase getByIdUseCase;

  public FingerprintsGetController(GetFingerprintByIdUseCase getByIdUseCase) {
    this.getByIdUseCase = getByIdUseCase;
  }

  @PreAuthorize("isAuthenticated()")
  @GetMapping("/{id}")
  public ResponseEntity<FingerprintDto.FingerprintResponse> getById(
      @PathVariable Long id) {

    var fingerprint = getByIdUseCase.execute(id);
    return ResponseEntity.ok(FingerprintDto.toResponse(fingerprint));
  }
}
