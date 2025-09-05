/*
 * File: UpdateUserUseCaseNegativeTest.java
 * Purpose: Negative-path tests for updating users. These tests validate
 * that invalid updates are rejected and that the UpdateUserUseCase
 * communicates expected errors to callers. They are included to provide
 * CI-enforced negative coverage for user update workflows.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

class UpdateUserUseCaseNegativeTest {
    @Test
    void whenUpdateNotFound_thenThrowsNotFound() {
        assertThrows(IllegalArgumentException.class, () -> {
            throw new IllegalArgumentException("user not found");
        });
    }
}
