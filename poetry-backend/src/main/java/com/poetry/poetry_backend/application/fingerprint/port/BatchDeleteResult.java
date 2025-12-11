/*
 * File: BatchDeleteResult.java
 * Purpose: Result record for batch template deletion operations.
 * Contains counts and details of successful and failed slot deletions.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.fingerprint.port;

import java.util.List;

public record BatchDeleteResult(
        int deletedCount,
        List<Integer> failedSlots,
        boolean allSucceeded) {

    public static BatchDeleteResult success(int count) {
        return new BatchDeleteResult(count, List.of(), true);
    }

    public static BatchDeleteResult partial(int ok, List<Integer> failed) {
        return new BatchDeleteResult(ok, failed, false);
    }
}
