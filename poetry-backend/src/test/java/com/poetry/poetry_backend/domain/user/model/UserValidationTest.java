/*
 * File: UserValidationTest.java
 * Purpose: Tests for the User domain model focusing on validation rules.
 * These tests assert which fields are required and which are optional. The
 * current domain model allows a null email; the test documents and asserts
 * this behavior so CI reflects the current system state. This prevents
 * regressions when domain validation rules change.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.model;

import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;

class UserValidationTest {
    @Test
    void whenNullEmail_thenAllowed() {
        var user = new User(1L, "F", "L", null, "u", true, java.util.Set.of());
        // Domain model currently allows a null email; assert the value is preserved
        assertNull(user.getEmail());
    }
}
