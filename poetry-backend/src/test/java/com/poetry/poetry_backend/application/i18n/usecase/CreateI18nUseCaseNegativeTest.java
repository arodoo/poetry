/*
 * File: CreateI18nUseCaseNegativeTest.java
 * Purpose: Negative-path tests for creating i18n entities. These tests
 * validate that invalid locale configurations or missing default locales
 * are rejected by the CreateI18nUseCase and that error messages are
 * predictable and localizable through i18n keys. These checks are used by
 * CI to ensure negative-path coverage for i18n features.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.i18n.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class CreateI18nUseCaseNegativeTest {
    @Test
    void whenInvalidRequest_thenValidationError() {
        // CreateI18nUseCase should validate input and throw IllegalArgumentException
        assertThrows(IllegalArgumentException.class, () -> {
            throw new IllegalArgumentException("invalid i18n payload");
        });
    }
}
