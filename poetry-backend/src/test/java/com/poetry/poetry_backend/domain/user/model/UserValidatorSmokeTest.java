/*
 * File: UserValidatorSmokeTest.java
 * Purpose: Confirm UserValidator class exists and is accessible.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class UserValidatorSmokeTest {
    @Test
    void classExists() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.user.model.UserValidator");
        assertNotNull(cls);
        assertTrue(cls.getDeclaredConstructors().length >= 0);
    }
}
