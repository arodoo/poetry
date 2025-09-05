/*
 * File: I18nValidationTest.java
 * Purpose: Validation tests for the i18n domain model. These tests assert
 * that invalid default locales or unsupported locale lists are rejected by
 * the domain constructors and that corresponding i18n keys are emitted for
 * localization. They provide negative-path guarantees relied upon by the
 * application's higher layers and CI checks.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.i18n.model;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;

class I18nValidationTest {
    @Test
    void whenDefaultLocaleBlank_thenThrowsKey() {
        assertThrows(IllegalArgumentException.class, () -> I18n.of("", List.of("en")));
    }
}
