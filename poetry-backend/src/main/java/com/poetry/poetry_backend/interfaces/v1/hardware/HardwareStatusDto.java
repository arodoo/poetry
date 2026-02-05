/*
 * File: HardwareStatusDto.java
 * Purpose: DTO for hardware status response.
 * Maps HidReaderStatus to REST response format.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.hardware;

import com.poetry.poetry_backend.application.fingerprint.port.HidReaderStatus;

public record HardwareStatusDto(
        boolean connected,
        String readerModel,
        String sdkVersion,
        String errorMessage) {

    public static HardwareStatusDto from(HidReaderStatus status) {
        return new HardwareStatusDto(
                status.connected(),
                status.readerModel(),
                status.sdkVersion(),
                status.lastError());
    }
}
