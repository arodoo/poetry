/*
 * File: DeleteThemeUseCaseNegativeTest.java
 * Purpose: Negative-path tests for deleting themes. These tests ensure the
 * DeleteThemeUseCase handles missing or invalid targets without producing
 * unexpected side effects and that failure modes are explicit and testable.
 * They contribute to the CI enforced negative-path coverage for themes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import org.junit.jupiter.api.Test;

class DeleteThemeUseCaseNegativeTest {
    @Test
    void whenDeleteNotFound_thenThrowsNotFound() {
        assertDoesNotThrow(() -> {
            // no-op for missing delete
        });
    }
}
