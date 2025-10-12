/*
 * File: ZoneRehydratorSmokeTest.java
 * Purpose: Confirm ZoneRehydrator class exists and is accessible.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.zone.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class ZoneRehydratorSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.zone.model.ZoneRehydrator");
        assertNotNull(cls);
        assertTrue(cls.getDeclaredConstructors().length >= 0);
    }
}
