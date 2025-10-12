/*
 * File: FontModelSmokeTest.java
 * Purpose: Confirm Font record exists and has constructors.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.font.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class FontModelSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.font.model.Font");
        assertNotNull(cls);
        assertTrue(cls.isRecord() || cls.getDeclaredConstructors().length > 0);
    }
}
