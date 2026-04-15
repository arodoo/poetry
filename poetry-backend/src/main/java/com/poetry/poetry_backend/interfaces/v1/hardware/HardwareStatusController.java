/*
 * File: HardwareStatusController.java
 * Purpose: REST endpoint for hardware status monitoring.
 * Returns current state of connected fingerprint reader
 * and whether the scanner loop is active.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.hardware;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poetry.poetry_backend.application.fingerprint.port.HidCapturePort;
import com.poetry.poetry_backend.application.fingerprint.port.HidReaderStatus;
import com.poetry.poetry_backend.infrastructure.hardware.hid.FingerprintScannerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/hardware")
@Tag(name = "Hardware", description = "Hardware status monitoring")
public class HardwareStatusController {

    private final HidCapturePort capturePort;
    private final FingerprintScannerService scanner;

    public HardwareStatusController(
            HidCapturePort capturePort,
            FingerprintScannerService scanner) {
        this.capturePort = capturePort;
        this.scanner = scanner;
    }

    @Operation(
            operationId = "getHardwareStatus",
            summary = "Get reader status")
    @GetMapping("/status")
    public ResponseEntity<HardwareStatusDto> getStatus() {
        HidReaderStatus status = capturePort.getReaderStatus();
        return ResponseEntity.ok(
                HardwareStatusDto.from(status, scanner.isRunning()));
    }
}
