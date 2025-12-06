/*
 * File: FingerprintCleanupResult.java
 * Purpose: Result record for cleanup use case containing archived count
 * and list of R503 slot IDs to delete from device.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.cleanup;

import java.util.List;

public record FingerprintCleanupResult(
        int archivedCount,
        List<Integer> slotIdsToDelete) {
}
