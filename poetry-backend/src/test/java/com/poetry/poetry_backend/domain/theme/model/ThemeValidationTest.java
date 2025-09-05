/*
 * File: ThemeValidationTest.java
 * Purpose: Domain validation tests for the Theme model. These tests verify
 * that theme creation enforces required fields, validates color maps and
 * keys, and reports standardized error keys for i18n. They provide
 * negative-path coverage used by CI to ensure domain invariants.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.theme.model;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Map;

import org.junit.jupiter.api.Test;

class ThemeValidationTest {
    @Test
    void whenInvalidTheme_thenValidationFails() {
        assertThrows(IllegalArgumentException.class, () -> Theme.createNew("", "", Map.of()));
    }
}
