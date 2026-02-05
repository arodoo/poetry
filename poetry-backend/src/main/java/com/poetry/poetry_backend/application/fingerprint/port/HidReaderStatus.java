/*
 * File: HidReaderStatus.java
 * Purpose: Value object representing HID reader connection status.
 * Used for diagnostics and UI feedback on hardware availability.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

public record HidReaderStatus(
        boolean connected,
        String readerModel,
        String sdkVersion,
        String lastError) {

    public static HidReaderStatus disconnected() {
        return new HidReaderStatus(false, null, null, null);
    }

    public static HidReaderStatus connected(String model, String sdkVersion) {
        return new HidReaderStatus(true, model, sdkVersion, null);
    }
}
