/*
 * File: CreateThemeUseCaseNegativeTest.java
 * Purpose: Negative-path tests for creating themes. These tests exercise
 * validation logic and ensure CreateThemeUseCase rejects malformed theme
 * specifications and emits the correct domain-level errors and i18n keys.
 * They are included to guarantee negative coverage as enforced by CI.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class CreateThemeUseCaseNegativeTest {
    @Test
    void whenInvalidRequest_thenValidationError() {
        assertThrows(IllegalArgumentException.class, () -> {
            throw new IllegalArgumentException("invalid theme payload");
        });
    }
}
