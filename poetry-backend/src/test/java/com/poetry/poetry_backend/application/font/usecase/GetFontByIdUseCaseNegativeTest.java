/*
 * File: GetFontByIdUseCaseNegativeTest.java
 * Purpose: Negative-path tests for retrieving font by id. These tests
 * ensure the GetFontByIdUseCase correctly surfaces not-found conditions
 * and does not return null or invalid domain objects when a font id is
 * missing. They make contracts explicit for consumers and CI checks.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.font.usecase;

import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontQueryPort;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

class GetFontByIdUseCaseNegativeTest {

    @Test
    void whenNotFound_thenReturnsEmptyOptional() {
        FontQueryPort port = new FontQueryPort() {
            @Override public java.util.List<FontAsset> findAll() { return java.util.List.of(); }
            @Override public Optional<FontAsset> findByKey(String key) { return Optional.empty(); }
        };
        var uc = new GetFontByIdUseCase(port);
        assertFalse(uc.execute("nope").isPresent());
    }
}
