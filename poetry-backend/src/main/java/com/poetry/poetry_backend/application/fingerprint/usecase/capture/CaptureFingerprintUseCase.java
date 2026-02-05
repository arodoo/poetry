/*
 * File: CaptureFingerprintUseCase.java
 * Purpose: UseCase for initiating fingerprint capture via HID hardware.
 * Delegates to HidCapturePort and returns captured FMD string.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.capture;

import org.springframework.stereotype.Service;

import com.poetry.poetry_backend.application.fingerprint.port.HidCaptureException;
import com.poetry.poetry_backend.application.fingerprint.port.HidCapturePort;

@Service
public class CaptureFingerprintUseCase {

    private static final int DEFAULT_TIMEOUT_MS = 30000;
    private final HidCapturePort capturePort;

    public CaptureFingerprintUseCase(HidCapturePort capturePort) {
        this.capturePort = capturePort;
    }

    public CaptureResult execute() {
        return execute(DEFAULT_TIMEOUT_MS);
    }

    public CaptureResult execute(int timeoutMs) {
        try {
            String fmd = capturePort.capture(timeoutMs);
            return CaptureResult.success(fmd);
        } catch (HidCaptureException e) {
            return CaptureResult.failure(e.getErrorCode().name());
        }
    }
}
