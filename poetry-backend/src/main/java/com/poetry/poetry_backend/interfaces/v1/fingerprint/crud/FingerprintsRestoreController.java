/*
 * File: FingerprintsRestoreController.java
 * Purpose: REST controller for fingerprint restoration endpoint.
 * Restores archived fingerprints to active status with new R503 slot.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.crud;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.fingerprint.usecase.lifecycle.RestoreFingerprintUseCase;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.interfaces.v1.fingerprint.dto.FingerprintDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/fingerprints")
@Tag(name = "Fingerprints", description = "Fingerprint management")
public class FingerprintsRestoreController {

    private final RestoreFingerprintUseCase restoreUseCase;

    public FingerprintsRestoreController(RestoreFingerprintUseCase restoreUseCase) {
        this.restoreUseCase = restoreUseCase;
    }

    @PostMapping("/{id}/restore")
    @Operation(summary = "Restore archived fingerprint to active status")
    public ResponseEntity<FingerprintDto.FingerprintResponse> restore(
            @PathVariable Long id) {
        Fingerprint restored = restoreUseCase.execute(id);
        return ResponseEntity.ok(FingerprintDto.toResponse(restored));
    }
}
