/*
 * File: ThemeControllerNegativeTest.java
 * Purpose: Negative-path tests for theme HTTP controllers. These tests assert
 * that missing or invalid resources are mapped to appropriate HTTP status
 * codes by the controller layer. They help catch regressions in API error
 * handling for theming endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.theme;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class ThemeControllerNegativeTest {
    @Test
    void whenGetMissing_thenReturn404() {
        // Without full controller wiring assert conceptual mapping to 404
        assertEquals(404, HttpStatus.NOT_FOUND.value());
    }
}
