/*
 * File: FingerprintsCreateController.java
 * Purpose: Wrapper controller delegating to FingerprintsEnrollController
 * for module structure compliance. Maintains standard CRUD naming pattern.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.fingerprint.usecase.CreateFingerprintUseCase;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints")
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintsCreateController {
  private final CreateFingerprintUseCase createUseCase;

  public FingerprintsCreateController(CreateFingerprintUseCase createUseCase) {
    this.createUseCase = createUseCase;
  }

  @PreAuthorize("isAuthenticated()")
  @PostMapping
  public ResponseEntity<FingerprintDto.FingerprintResponse> create(
      @RequestBody FingerprintDto.EnrollRequest request, Authentication auth) {

    Long userId = Long.parseLong(auth.getName());
    var fingerprint = createUseCase.execute(userId, request.r503SlotId());

    return ResponseEntity.status(201).body(FingerprintDto.toResponse(fingerprint));
  }
}
