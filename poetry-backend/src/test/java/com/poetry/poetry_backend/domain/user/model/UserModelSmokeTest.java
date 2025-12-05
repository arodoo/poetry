/*
 * File: UserModelSmokeTest.java
 * Purpose: Confirm User record exists and is a record type.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class UserModelSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.user.model.core.User");
        assertNotNull(cls);
        assertTrue(cls.isRecord());
    }
}
