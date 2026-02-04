/*
 * File: FingerprintCleanupResult.java
 * Purpose: Result record for cleanup use case containing archived count.
 * All Rights Reserved Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.usecase.cleanup;

public record FingerprintCleanupResult(int archivedCount) {
        public static FingerprintCleanupResult success(int archivedCount) {
                return new FingerprintCleanupResult(archivedCount);
        }
}
