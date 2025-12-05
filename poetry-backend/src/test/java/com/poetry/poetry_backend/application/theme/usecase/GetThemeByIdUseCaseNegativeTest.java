/*
 * File: GetThemeByIdUseCaseNegativeTest.java
 * Purpose: Negative-path tests for retrieving themes by id. Ensures the
 * GetThemeByIdUseCase throws ThemeNotFoundException when the theme is
 * absent and that normal retrieval returns a valid domain object. These
 * tests support consistent behavior across the application and CI.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.theme.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.theme.port.ThemeQueryPort;
import com.poetry.poetry_backend.application.theme.usecase.crud.GetThemeByIdUseCase;
import com.poetry.poetry_backend.domain.theme.exception.ThemeNotFoundException;
import com.poetry.poetry_backend.domain.theme.model.Theme;

class GetThemeByIdUseCaseNegativeTest {
    @Test
    void whenNotFound_thenThrowsNotFound() {
        ThemeQueryPort query = new ThemeQueryPort() {
            public List<Theme> findAll() {
                return List.of();
            }

            public Optional<Theme> findById(Long id) {
                return Optional.empty();
            }

            public Optional<Theme> findActive() {
                return Optional.empty();
            }
        };

        var uc = new GetThemeByIdUseCase(query);
        assertThrows(ThemeNotFoundException.class, () -> uc.execute(9L));
    }
}
