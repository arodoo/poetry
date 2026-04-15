/*
 * File: ScannerStateDto.java
 * Purpose: Simple DTO for scanner running state responses.
 * Returns whether the fingerprint scanner loop is active.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1.hardware;

public record ScannerStateDto(boolean scanning) {
}
