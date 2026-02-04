/*
 * File: FingerprintsVerifyController.java
 * Purpose: Provides fingerprint verification endpoint matching captured
 * template against enrolled fingerprints. Returns match result for access
 * control decisions and relay activation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.application.fingerprint.usecase.VerifyFingerprintResult;
import com.poetry.poetry_backend.application.fingerprint.usecase.VerifyFingerprintUseCase;
import com.poetry.poetry_backend.interfaces.v1.fingerprint.dto.FingerprintDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "fingerprints", description = "Fingerprint verification")
@RestController
@RequestMapping("/api/v1/fingerprints")
public class FingerprintsVerifyController {
  private final VerifyFingerprintUseCase verifyUseCase;

  public FingerprintsVerifyController(VerifyFingerprintUseCase verifyUseCase) {
    this.verifyUseCase = verifyUseCase;
  }

  @Operation(operationId = "verifyFingerprint", summary = "Verify a fingerprint", // i18n-ignore
      description = "Verify fingerprint by matching probe FMD against enrolled templates") // i18n-ignore
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Verification completed"),
      @ApiResponse(responseCode = "400", description = "Invalid FMD data")
  })
  @PostMapping("/verify")
  public ResponseEntity<FingerprintDto.VerifyResponse> verify(
      @RequestBody FingerprintDto.VerifyRequest request) {

    VerifyFingerprintResult result = verifyUseCase.execute(request.fmd());

    var response = new FingerprintDto.VerifyResponse(
        result.matched(), result.userId(), result.fingerprintId(), result.message());

    return ResponseEntity.ok(response);
  }
}
