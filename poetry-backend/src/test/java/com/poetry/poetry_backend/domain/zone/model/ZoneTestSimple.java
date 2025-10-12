/*
 * File: ZoneTestSimple.java
 * Purpose: Confirm Zone record presence via reflection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.zone.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class ZoneTestSimple {
    @Test
    void classIsRecord() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.zone.model.Zone");
        assertNotNull(cls);
        assertTrue(cls.isRecord());
    }
}
