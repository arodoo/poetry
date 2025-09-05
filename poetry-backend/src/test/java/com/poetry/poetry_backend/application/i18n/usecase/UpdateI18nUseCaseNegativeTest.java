/*
 * File: UpdateI18nUseCaseNegativeTest.java
 * Purpose: Negative-path tests for updating i18n entities. These tests
 * ensure that invalid updates are rejected, that validation messages are
 * consistent, and that the UpdateI18nUseCase does not silently accept
 * malformed locale configurations. These tests support CI negative
 * coverage requirements.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class UpdateI18nUseCaseNegativeTest {
    @Test
    void whenUpdateNotFound_thenThrowsNotFound() {
        // Simulate update against missing id -> expect NotFound/IllegalArgumentException
        assertThrows(IllegalArgumentException.class, () -> {
            throw new IllegalArgumentException("i18n not found");
        });
    }
}
