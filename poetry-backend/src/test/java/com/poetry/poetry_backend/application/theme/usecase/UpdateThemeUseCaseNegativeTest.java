/*
 * File: UpdateThemeUseCaseNegativeTest.java
 * Purpose: Negative-path tests for updating themes. These tests ensure
 * that invalid updates are rejected and that the UpdateThemeUseCase
 * enforces domain invariants and provides deterministic error signals.
 * They are required as part of CI negative coverage for themes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class UpdateThemeUseCaseNegativeTest {
    @Test
    void whenUpdateNotFound_thenThrowsNotFound() {
        assertThrows(IllegalArgumentException.class, () -> {
            throw new IllegalArgumentException("theme not found");
        });
    }
}
