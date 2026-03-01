/*
 * File: ScanResultHandler.java
 * Purpose: Handles a single capture+verify cycle for the fingerprint scanner.
 * Dispatches results via FingerprintEventPort after SDK capture succeeds.
 * Isolated to keep FingerprintScannerService within line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.hardware.hid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintEventPort;
import com.poetry.poetry_backend.application.fingerprint.port.HidCapturePort;
import com.poetry.poetry_backend.application.fingerprint.usecase.VerifyFingerprintResult;
import com.poetry.poetry_backend.application.fingerprint.usecase.VerifyFingerprintUseCase;

@Component
public class ScanResultHandler {

    private static final Logger log =
            LoggerFactory.getLogger(ScanResultHandler.class);
    private static final int CAPTURE_MS = 30_000;

    private final HidCapturePort capturePort;
    private final VerifyFingerprintUseCase verifyUseCase;
    private final FingerprintEventPort eventPort;

    public ScanResultHandler(
            HidCapturePort capturePort,
            VerifyFingerprintUseCase verifyUseCase,
            FingerprintEventPort eventPort) {
        this.capturePort = capturePort;
        this.verifyUseCase = verifyUseCase;
        this.eventPort = eventPort;
    }

    /** Runs one capture→verify cycle. Throws on hardware error. */
    public void handleOne() throws Exception {
        String fmd = capturePort.capture(CAPTURE_MS);
        VerifyFingerprintResult result = verifyUseCase.execute(fmd);
        if (result.matched() && result.userId() != null) {
            log.info("[Scanner] match userId={}", result.userId());
            eventPort.broadcastMatch(result.userId());
        } else {
            log.info("[Scanner] unknown finger");
            eventPort.broadcastUnknown();
        }
    }
}
