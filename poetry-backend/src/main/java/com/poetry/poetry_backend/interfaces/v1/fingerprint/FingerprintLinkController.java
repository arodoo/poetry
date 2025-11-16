/*
 * File: FingerprintLinkController.java
 * Purpose: Endpoint to link pre-enrolled fingerprint slot to created user.
 * Persists fingerprint record, slot history, and user association after
 * wizard completes hardware enrollment and user creation finishes.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.fingerprint.usecase.LinkFingerprintToUserUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "users", description = "Link fingerprint to user")
@RestController
@RequestMapping("/api/v1/users")
public class FingerprintLinkController {
  private final LinkFingerprintToUserUseCase linkUseCase;

  public FingerprintLinkController(LinkFingerprintToUserUseCase linkUseCase) {
    this.linkUseCase = linkUseCase;
  }

  @Operation(
      operationId = "linkFingerprintToUser",
      summary = "Link fingerprint slot",
      description = "Associate R503 slot with user after enrollment")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "Linked successfully"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
      })
  @PreAuthorize("hasAnyRole('ADMIN','USER')")
  @PostMapping("/{userId}/fingerprints/link")
  public ResponseEntity<FingerprintDto.FingerprintResponse> link(
      @PathVariable Long userId, @RequestBody LinkRequest request) {

    var fingerprint = linkUseCase.execute(userId, request.slotId());
    return ResponseEntity.ok(FingerprintDto.toResponse(fingerprint));
  }

  public record LinkRequest(Integer slotId) {}
}
