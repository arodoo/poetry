/*
 * File: FingerprintScannerService.java
 * Purpose: On-demand fingerprint capture service. Does NOT auto-start.
 * Scanning begins only via startScanner() and stops via stopScanner().
 * Avoids blocking the app when no reader is connected.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.hardware.hid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.poetry.poetry_backend.application.fingerprint.port.HidCapturePort;

import jakarta.annotation.PreDestroy;

@Service
public class FingerprintScannerService {

    private static final Logger log =
            LoggerFactory.getLogger(FingerprintScannerService.class);

    private final ScanResultHandler handler;
    private final HidCapturePort capturePort;
    private volatile boolean running = false;

    public FingerprintScannerService(
            ScanResultHandler handler, HidCapturePort capturePort) {
        this.handler = handler;
        this.capturePort = capturePort;
    }

    public synchronized void startScanner() {
        if (running) return;
        if (!capturePort.isReaderConnected()) {
            log.warn("[Scanner] no reader connected");
            return;
        }
        running = true;
        Thread t = new Thread(
            new ScanLoop(handler, capturePort, this::markStopped, log),
            "fingerprint-scanner");
        t.setDaemon(true);
        t.start();
        log.info("[Scanner] started");
    }

    @PreDestroy
    public void stopScanner() {
        running = false;
        capturePort.cancelCapture();
    }

    public boolean isRunning() { return running; }

    void markStopped() { running = false; }
}
