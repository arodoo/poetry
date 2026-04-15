/*
 * File: HardwareStatusDto.java
 * Purpose: DTO for hardware status response. Maps HidReaderStatus
 * and scanner state to REST response format. Includes scanning
 * field so the frontend knows if the loop is active.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.hardware;

import com.poetry.poetry_backend.application.fingerprint.port.HidReaderStatus;

public record HardwareStatusDto(
        boolean connected,
        String readerModel,
        String sdkVersion,
        String errorMessage,
        boolean scanning) {

    public static HardwareStatusDto from(
            HidReaderStatus status, boolean scanning) {
        return new HardwareStatusDto(
                status.connected(),
                status.readerModel(),
                status.sdkVersion(),
                status.lastError(),
                scanning);
    }
}
