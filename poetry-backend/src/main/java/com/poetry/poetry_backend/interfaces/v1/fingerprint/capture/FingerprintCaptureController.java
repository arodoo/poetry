/*
 * File: FingerprintCaptureController.java
 * Purpose: REST endpoint for initiating fingerprint capture via HID reader.
 * Returns captured FMD to frontend for enrollment workflow.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.fingerprint.capture;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.fingerprint.usecase.capture.CancelCaptureUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.capture.CaptureFingerprintUseCase;
import com.poetry.poetry_backend.application.fingerprint.usecase.capture.CaptureResult;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/fingerprints")
@Tag(name = "Fingerprint Capture", description = "HID hardware capture")
public class FingerprintCaptureController {

    private final CaptureFingerprintUseCase captureUseCase;
    private final CancelCaptureUseCase cancelUseCase;

    public FingerprintCaptureController(CaptureFingerprintUseCase captureUseCase,
                                        CancelCaptureUseCase cancelUseCase) {
        this.captureUseCase = captureUseCase;
        this.cancelUseCase = cancelUseCase;
    }

    @Operation(operationId = "captureFingerprint", summary = "Capture fingerprint from HID reader", // i18n-ignore
            description = "Initiates capture on connected reader") // i18n-ignore
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Capture result"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "503", description = "Reader unavailable")
    })
    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/capture")
    public ResponseEntity<CaptureResponse> capture(
            @RequestBody(required = false) CaptureRequest request) {
        int timeout = request != null ? request.timeoutMs() : 30000;
        CaptureResult result = captureUseCase.execute(timeout);

        if (result.success()) {
            return ResponseEntity.ok(CaptureResponse.success(result.fmd()));
        } else {
            return ResponseEntity.ok(CaptureResponse.failure(result.errorCode()));
        }
    }

    @Operation(operationId = "deleteFingerprintsCapture", summary = "Cancel ongoing capture", // i18n-ignore
            description = "Aborts the physical hardware laser operation immediately.") // i18n-ignore
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Capture aborted")
    })
    @PreAuthorize("hasAuthority('admin')")
    @org.springframework.web.bind.annotation.DeleteMapping("/capture")
    public ResponseEntity<Void> cancelCapture() {
        cancelUseCase.execute();
        return ResponseEntity.ok().build();
    }

    public record CaptureRequest(Integer timeoutMs) {
    }

    public record CaptureResponse(boolean success, String fmd, String errorCode) {
        public static CaptureResponse success(String fmd) {
            return new CaptureResponse(true, fmd, null);
        }

        public static CaptureResponse failure(String errorCode) {
            return new CaptureResponse(false, null, errorCode);
        }
    }
}
