/*
 * File: FingerprintScannerService.java
 * Purpose: Background service that runs a continuous capture loop via the HID
 * SDK and pushes results to WebSocket clients through ScanResultHandler.
 * Replaces HTTP long-polling with an event-driven push architecture.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.hardware.hid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import com.poetry.poetry_backend.application.fingerprint.port.HidCapturePort;

import jakarta.annotation.PreDestroy;

@Service
public class FingerprintScannerService {

    private static final Logger log =
            LoggerFactory.getLogger(FingerprintScannerService.class);
    private static final int RETRY_DELAY_MS = 200;

    private final ScanResultHandler handler;
    private final HidCapturePort capturePort;
    private volatile boolean running = false;

    public FingerprintScannerService(
            ScanResultHandler handler, HidCapturePort capturePort) {
        this.handler = handler;
        this.capturePort = capturePort;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void startScanner() {
        running = true;
        Thread t = new Thread(this::scanLoop, "fingerprint-scanner");
        t.setDaemon(true);
        t.start();
        log.info("[Scanner] started");
    }

    @PreDestroy
    public void stopScanner() {
        running = false;
        capturePort.cancelCapture();
    }

    private void scanLoop() {
        while (running) {
            try {
                handler.handleOne();
            } catch (Exception e) {
                log.warn("[Scanner] error: {} retrying in {}ms",
                        e.getMessage(), RETRY_DELAY_MS);
                try {
                    Thread.sleep(RETRY_DELAY_MS);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
            }
        }
        log.info("[Scanner] stopped");
    }
}
