/*
 * File: DashboardModelSmokeTest.java
 * Purpose: Confirm Dashboard record exists and has constructors.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.dashboard.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class DashboardModelSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.dashboard.model.Dashboard");
        assertNotNull(cls);
        assertTrue(cls.isRecord() || cls.getDeclaredConstructors().length > 0);
    }
}
