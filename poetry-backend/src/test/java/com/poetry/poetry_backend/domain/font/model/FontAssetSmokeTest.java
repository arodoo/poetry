/*
 * File: FontAssetSmokeTest.java
 * Purpose: Confirm FontAsset record exists and has constructors.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.font.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class FontAssetSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.font.model.FontAsset");
        assertNotNull(cls);
        assertTrue(cls.isRecord() || cls.getDeclaredConstructors().length > 0);
    }
}
