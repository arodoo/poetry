/*
 * File: UserLifecycleManagerSmokeTest.java
 * Purpose: Confirm UserLifecycleManager class exists.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class UserLifecycleManagerSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.user.model.UserLifecycleManager");
        assertNotNull(cls);
        assertTrue(cls.getDeclaredConstructors().length > 0);
    }
}
