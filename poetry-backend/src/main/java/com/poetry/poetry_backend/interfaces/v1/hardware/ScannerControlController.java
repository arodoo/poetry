/*
 * File: ScannerControlController.java
 * Purpose: REST endpoints for on-demand scanner start/stop.
 * Allows admins to control the fingerprint scanning loop.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.hardware;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.poetry.poetry_backend.infrastructure.hardware.hid.FingerprintScannerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/hardware/scanner")
@Tag(name = "Hardware", description = "Scanner control")
public class ScannerControlController {

    private final FingerprintScannerService scanner;

    public ScannerControlController(FingerprintScannerService scanner) {
        this.scanner = scanner;
    }

    private ScannerStateDto currentState() {
        return new ScannerStateDto(scanner.isRunning());
    }

    @Operation(operationId = "startScanner", summary = "Start scanning")
    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/start")
    public ResponseEntity<ScannerStateDto> start() {
        scanner.startScanner();
        return ResponseEntity.ok(currentState());
    }

    @Operation(operationId = "stopScanner", summary = "Stop scanning")
    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/stop")
    public ResponseEntity<ScannerStateDto> stop() {
        scanner.stopScanner();
        return ResponseEntity.ok(currentState());
    }

    @Operation(operationId = "getScannerState", summary = "Get state")
    @GetMapping("/state")
    public ResponseEntity<ScannerStateDto> state() {
        return ResponseEntity.ok(currentState());
    }
}
