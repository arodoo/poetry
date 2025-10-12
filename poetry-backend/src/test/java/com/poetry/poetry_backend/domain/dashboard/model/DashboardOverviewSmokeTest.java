/*
 * File: DashboardOverviewSmokeTest.java
 * Purpose: Confirm DashboardOverview record exists and has constructors.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.dashboard.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class DashboardOverviewSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.dashboard.model.DashboardOverview");
        assertNotNull(cls);
        assertTrue(cls.isRecord() || cls.getDeclaredConstructors().length > 0);
    }
}
