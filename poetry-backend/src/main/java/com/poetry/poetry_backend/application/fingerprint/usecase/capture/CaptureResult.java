/*
 * File: CaptureResult.java
 * Purpose: Result object for fingerprint capture operation.
 * Contains either captured FMD or error code for display.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.capture;

public record CaptureResult(
        boolean success,
        String fmd,
        String errorCode) {

    public static CaptureResult success(String fmd) {
        return new CaptureResult(true, fmd, null);
    }

    public static CaptureResult failure(String errorCode) {
        return new CaptureResult(false, null, errorCode);
    }
}
