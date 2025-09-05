/*
 * File: FontValidationTest.java
 * Purpose: Negative-path unit tests for the Font domain validation rules. These
 * tests confirm that invalid font attributes are rejected during domain
 * construction and that the domain emits standardized i18n keys for error
 * messages, aiding localization and consistent error handling across the
 * application. They are part of the required negative test coverage in CI.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.font.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;

class FontValidationTest {

    @Test
    void whenKeyBlank_thenThrowsWithI18nKey() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> FontAsset.createNew("", "Label", "u", List.of(400), "h", true, null));
        assertEquals("font.key.missing", ex.getMessage());
    }

    @Test
    void whenLabelBlank_thenThrowsWithI18nKey() {
        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class,
                () -> FontAsset.createNew("k", "", "u", List.of(400), "h", true, null));
        assertEquals("font.label.missing", ex.getMessage());
    }
}
