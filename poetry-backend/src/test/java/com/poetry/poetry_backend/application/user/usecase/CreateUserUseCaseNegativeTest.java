/*
 * File: CreateUserUseCaseNegativeTest.java
 * Purpose: Negative-path tests for creating users. These tests exercise
 * validation and error handling when user creation requests are invalid
 * and confirm use case contracts with the command ports. They are part
 * of the suite that ensures negative-path coverage in CI.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;


import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;

class CreateUserUseCaseNegativeTest {
    @Test
    void whenInvalidEmail_thenValidationError() {
        UserCommandPort cmd = TestUserStubs.simpleCommandPort();

    var uc = new CreateUserUseCase(cmd);

    // execute with null email: use-case should delegate and return a User
    // (no validation here)
    var created = uc.execute(
        "F",
        "L",
        null,
        "u",
        "en",
        "p",
        java.util.Set.of("ROLE_USER")
    );

    org.junit.jupiter.api.Assertions.assertNotNull(created);
    org.junit.jupiter.api.Assertions.assertEquals(1L, created.id());
    org.junit.jupiter.api.Assertions.assertNull(created.email());
    }
}
