/*
 * File: DeleteFontUseCaseNegativeTest.java
 * Purpose: Negative-path tests for the font delete use case. These tests
 * verify behavior when delete operations target missing resources or when
 * inputs are outside expected ranges. Tests ensure the DeleteFontUseCase
 * handles such situations gracefully without producing unexpected side
 * effects, and they document the contract for negative scenarios.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontCommandPort;

class DeleteFontUseCaseNegativeTest {

    @Test
    void whenDeleteMissing_thenNoException() {
        FontCommandPort cmd = new FontCommandPort() {
            @Override public void deleteSoft(Long id) { /* no-op */ }
            @Override public com.poetry.poetry_backend.domain.font.model.FontAsset save(
                    com.poetry.poetry_backend.domain.font.model.FontAsset asset) { return asset; }
        };
        var uc = new DeleteFontUseCase(cmd);
        uc.execute(9999L); // should not throw
    }
}
