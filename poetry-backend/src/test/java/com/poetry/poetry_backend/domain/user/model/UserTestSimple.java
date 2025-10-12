/*
 * File: UserTestSimple.java
 * Purpose: Confirm User record presence and basic shape via reflection.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class UserTestSimple {
    @Test
    void classIsRecord() throws ClassNotFoundException {
        Class<?> cls = Class.forName("com.poetry.poetry_backend.domain.user.model.User");
        assertNotNull(cls);
        assertTrue(cls.isRecord());
    }
}
