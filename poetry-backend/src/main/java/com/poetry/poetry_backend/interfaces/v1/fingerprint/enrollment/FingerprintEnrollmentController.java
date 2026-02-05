/*
 * File: FingerprintEnrollmentController.java
 * Purpose: REST endpoint for fingerprint enrollment.
 * Saves FMD template for user identification and verification.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.enrollment;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping("/api/v1/users/{userId}/fingerprints")
@Tag(name = "Fingerprint Enrollment", description = "Fingerprint enrollment")
public class FingerprintEnrollmentController {
        private final EnrollFingerprintUseCase enrollUseCase;

        public FingerprintEnrollmentController(EnrollFingerprintUseCase enrollUseCase) {
                this.enrollUseCase = enrollUseCase;
        }

        @Operation(operationId = "enrollFingerprintForUser", summary = "Enroll fingerprint", // i18n-ignore
                        description = "Saves FMD template for user") // i18n-ignore
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Enrolled"),
                        @ApiResponse(responseCode = "400", description = "Invalid FMD"),
                        @ApiResponse(responseCode = "401", description = "Unauthorized")
        })
        @PreAuthorize("hasAuthority('admin')")
        @PostMapping("/enroll")
        public ResponseEntity<FingerprintEnrollmentResponse> enrollForUser(
                        @PathVariable Long userId,
                        @RequestBody FingerprintDto.EnrollRequest request) {
                Fingerprint fp = enrollUseCase.execute(userId, request.fmd());
                return ResponseEntity.status(201)
                                .body(new FingerprintEnrollmentResponse(fp.id(), "ENROLLED"));
        }

        public record FingerprintEnrollmentResponse(Long fingerprintId, String status) {
        }
}
