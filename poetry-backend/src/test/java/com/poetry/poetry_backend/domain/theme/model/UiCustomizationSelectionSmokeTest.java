/*
 * File: UiCustomizationSelectionSmokeTest.java
 * Purpose: Confirm UiCustomizationSelection record exists and has constructors.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.theme.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class UiCustomizationSelectionSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.theme.model.UiCustomizationSelection");
        assertNotNull(cls);
        assertTrue(cls.isRecord() || cls.getDeclaredConstructors().length > 0);
    }
}
