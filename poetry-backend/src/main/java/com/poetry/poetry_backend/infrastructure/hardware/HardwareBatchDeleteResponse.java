/*
 * File: HardwareBatchDeleteResponse.java
 * Purpose: Response DTO from hardware service batch delete endpoint.
 * Maps JSON response with success flag, deleted count, and failures.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.hardware;

import java.util.List;

public record HardwareBatchDeleteResponse(
        boolean success,
        int deletedCount,
        List<FailedSlot> failedSlots) {

    public record FailedSlot(int slotId, String error) {
    }
}
