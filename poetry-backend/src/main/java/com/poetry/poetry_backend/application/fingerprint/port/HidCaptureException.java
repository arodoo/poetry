/*
 * File: HidCaptureException.java
 * Purpose: Exception thrown when HID fingerprint capture fails.
 * Provides specific error codes for different failure scenarios.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

public class HidCaptureException extends Exception {

    private final HidErrorCode errorCode;

    public HidCaptureException(HidErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public HidErrorCode getErrorCode() {
        return errorCode;
    }

    public enum HidErrorCode {
        READER_NOT_CONNECTED,
        CAPTURE_TIMEOUT,
        CAPTURE_CANCELLED,
        SDK_NOT_INITIALIZED,
        UNKNOWN_ERROR
    }
}
