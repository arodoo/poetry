/*
 * File: UpdateFontUseCaseNegativeTest.java
 * Purpose: Negative-path tests for updating font assets. These tests
 * validate that invalid update requests are rejected with appropriate
 * domain exceptions and that the UpdateFontUseCase enforces invariants.
 * They form part of the negative test coverage required by CI.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

class UpdateFontUseCaseNegativeTest {

    @Test
    void whenInvalidLabel_thenThrowsValidation() {
        FontCommandPort cmd = new FontCommandPort() {
            @Override public FontAsset save(FontAsset asset) { return asset; }
            @Override public void deleteSoft(Long id) { }
        };
        var uc = new UpdateFontUseCase(cmd);
        FontAsset existing = FontAsset.createNew("k", "Label", "u", List.of(400), "h", false, null);
        assertThrows(IllegalArgumentException.class,
                () -> uc.execute(existing, "", "u", List.of(400), false, true, null));
    }
}
