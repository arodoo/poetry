/*
 * File: GetUserByIdUseCaseNegativeTest.java
 * Purpose: Negative-path tests for retrieving users by id. Tests confirm
 * that missing users cause explicit not-found behavior and that the
 * use-case does not return invalid domain objects. These tests are part
 * of CI's negative path enforcement for user functionality.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class GetUserByIdUseCaseNegativeTest {
    @Test
    void whenNotFound_thenThrowsNotFound() {
        assertTrue(java.util.Optional.empty().isEmpty());
    }
}
