/*
 * File: FingerprintCleanupResult.java
 * Purpose: Result record for cleanup use case containing archived count,
 * slot IDs, and hardware deletion status with failed slots.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.cleanup;

import java.util.List;

public record FingerprintCleanupResult(
                int archivedCount,
                List<Integer> slotIdsToDelete,
                boolean hardwareDeletionSucceeded,
                List<Integer> hardwareFailedSlots) {

        public static FingerprintCleanupResult withoutHardware(
                        int archived, List<Integer> slots) {
                return new FingerprintCleanupResult(archived, slots, false, List.of());
        }

        public static FingerprintCleanupResult withHardware(
                        int archived, List<Integer> slots, boolean hwOk, List<Integer> failed) {
                return new FingerprintCleanupResult(archived, slots, hwOk, failed);
        }
}
