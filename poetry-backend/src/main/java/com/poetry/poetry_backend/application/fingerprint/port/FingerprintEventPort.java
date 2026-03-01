/*
 * File: FingerprintEventPort.java
 * Purpose: Port interface for broadcasting fingerprint scan results
 * to connected WebSocket clients in real time.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.fingerprint.port;

/**
 * Broadcasts fingerprint detection events to all connected WS sessions.
 */
public interface FingerprintEventPort {

    /** A known user was matched. */
    void broadcastMatch(long userId);

    /** Finger detected but no enrolled match found. */
    void broadcastUnknown();

    /** Hardware or SDK error during capture. */
    void broadcastError(String reason);
}
