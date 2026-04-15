/*
 * File: ScanLoop.java
 * Purpose: Runnable implementing the continuous fingerprint capture
 * loop. Auto-stops when the reader disconnects. Separated from
 * FingerprintScannerService for single-responsibility compliance.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.hardware.hid;

import org.slf4j.Logger;

import com.poetry.poetry_backend.application.fingerprint.port.HidCapturePort;

class ScanLoop implements Runnable {

    private static final int RETRY_DELAY_MS = 2000;

    private final ScanResultHandler handler;
    private final HidCapturePort capturePort;
    private final Runnable onStop;
    private final Logger log;

    ScanLoop(ScanResultHandler handler, HidCapturePort capturePort,
             Runnable onStop, Logger log) {
        this.handler = handler;
        this.capturePort = capturePort;
        this.onStop = onStop;
        this.log = log;
    }

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                handler.handleOne();
            } catch (Exception e) {
                log.warn("[Scanner] error: {}", e.getMessage());
                if (!capturePort.isReaderConnected()) {
                    log.info("[Scanner] reader disconnected");
                    onStop.run();
                    break;
                }
                sleep();
            }
        }
        log.info("[Scanner] stopped");
    }

    private void sleep() {
        try {
            Thread.sleep(RETRY_DELAY_MS);
        } catch (InterruptedException ie) {
            Thread.currentThread().interrupt();
        }
    }
}
