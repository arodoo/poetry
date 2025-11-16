/*
 * File: FingerprintReserveController.java
 * Purpose: Endpoint to reserve R503 slot before user creation. Returns next
 * available slot (0-1500) for frontend wizard enrollment. Slot persisted to
 * database after user creation via FingerprintLinkController.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.fingerprint.usecase.ReserveSlotUseCase;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints", description = "Fingerprint slot reservation")
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintReserveController {
  private final ReserveSlotUseCase reserveSlotUseCase;

  public FingerprintReserveController(ReserveSlotUseCase reserveSlotUseCase) {
    this.reserveSlotUseCase = reserveSlotUseCase;
  }

  @Operation(
      operationId = "reserveSlot",
      summary = "Reserve fingerprint slot",
      description = "Get next available R503 slot for wizard enrollment")
  @ApiResponses(
      value = {
        @ApiResponse(responseCode = "200", description = "Slot reserved"),
        @ApiResponse(responseCode = "503", description = "No slots available")
      })
  @PostMapping("/reserve-slot")
  public ResponseEntity<SlotReservationDto> reserveSlot() {
    Integer slotId = reserveSlotUseCase.execute();
    return ResponseEntity.ok(new SlotReservationDto(slotId));
  }

  public record SlotReservationDto(Integer slotId) {}
}
