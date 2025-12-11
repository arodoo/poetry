/*
 * File: HardwareSlotResponse.java
 * Purpose: Response DTO from hardware service available-slot endpoint.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.hardware;

public record HardwareSlotResponse(boolean success, Integer slotId) {
}
