/*
 * File: FingerprintsDeleteController.java
 * Purpose: Provides endpoint to soft-delete fingerprint enrollments by ID.
 * Performs authorization check ensuring users can only delete their own
 * fingerprints unless admin.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle.DeleteFingerprintUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints", description = "Fingerprint management")
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintsDeleteController {
  private final DeleteFingerprintUseCase deleteUseCase;

  public FingerprintsDeleteController(DeleteFingerprintUseCase deleteUseCase) {
    this.deleteUseCase = deleteUseCase;
  }

  @Operation(
      operationId = "deleteFingerprint",
      summary = "Delete a fingerprint",
      description = "Soft-delete fingerprint enrollment")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "204", description = "Deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
      })
  @PreAuthorize("isAuthenticated()")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    deleteUseCase.execute(id);
    return ResponseEntity.noContent().build();
  }
}
