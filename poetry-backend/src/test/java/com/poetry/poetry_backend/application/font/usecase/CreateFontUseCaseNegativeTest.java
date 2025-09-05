/*
 * File: CreateFontUseCaseNegativeTest.java
 * Purpose: Negative-path tests for the font create use case. These tests
 * exercise validation and error handling when invalid input is provided to
 * the CreateFontUseCase. They ensure the use case raises the expected
 * domain exceptions rather than silently succeeding. This file is part of
 * the automated test suite that guards negative application paths.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

class CreateFontUseCaseNegativeTest {

    @Test
    void whenInvalidRequest_thenValidationError() {
        FontCommandPort cmd = new FontCommandPort() {
            @Override
            public FontAsset save(FontAsset asset) {
                return asset;
            }

            @Override
            public void deleteSoft(Long id) {
            }
        };
        var uc = new CreateFontUseCase(cmd);
        var sizes = List.of(400);
        assertThrows(IllegalArgumentException.class,
                () -> uc.execute("", "L", "u", sizes, "h", true, null));
    }
}
