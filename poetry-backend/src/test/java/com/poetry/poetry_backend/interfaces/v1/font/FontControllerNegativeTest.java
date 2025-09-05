/*
 * File: FontControllerNegativeTest.java
 * Purpose: Integration-style negative tests for the font HTTP controllers. These
 * tests exercise paths where requested resources are missing or otherwise
 * invalid and assert the controller maps domain failures to the expected HTTP
 * status codes. This file exists to prevent regressions in API error handling.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.font.port.FontQueryPort;
import com.poetry.poetry_backend.application.font.usecase.GetFontByIdUseCase;
import com.poetry.poetry_backend.domain.font.model.FontAsset;

class FontControllerNegativeTest {

    @Test
    void whenGetDeleted_thenReturn404() {
            FontQueryPort qp = new FontQueryPort() {
                @Override
                public List<FontAsset> findAll() {
                    return List.of();
                }

                @Override
                public Optional<FontAsset> findByKey(
                        String key
                ) {
                    return Optional.empty();
                }
            };
            GetFontByIdUseCase get = new GetFontByIdUseCase(qp);
            var controller = new FontReadController(null, get);
            var resp = controller.byKey("missing");
            var expected = org.springframework.http.HttpStatus.NOT_FOUND;
            assertEquals(expected, resp.getStatusCode());
    }
}
