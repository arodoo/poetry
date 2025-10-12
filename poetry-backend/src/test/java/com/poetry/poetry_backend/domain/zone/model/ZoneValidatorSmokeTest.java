/*
 * File: ZoneValidatorSmokeTest.java
 * Purpose: Confirm Zone class exists via reflection instead of constructing.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.zone.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class ZoneValidatorSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.zone.model.Zone");
        assertNotNull(cls);
        assertTrue(cls.isRecord() || cls.getDeclaredConstructors().length > 0);
    }
}
