/*
 * File: CancelCaptureUseCase.java
 * Purpose: UseCase for canceling an ongoing physical fingerprint capture.
 * Delegates to HidCapturePort to stop the laser and free the thread.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.capture;

import org.springframework.stereotype.Service;

import com.poetry.poetry_backend.application.fingerprint.port.HidCapturePort;

@Service
public class CancelCaptureUseCase {

    private final HidCapturePort capturePort;

    public CancelCaptureUseCase(HidCapturePort capturePort) {
        this.capturePort = capturePort;
    }

    public void execute() {
        capturePort.cancelCapture();
    }
}
