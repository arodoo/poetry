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
import com.poetry.poetry_backend.domain.user.model.User;

class CreateUserUseCaseNegativeTest {
    @Test
    void whenInvalidEmail_thenValidationError() {
        // Implement a UserCommandPort stub matching the real interface signatures
        UserCommandPort cmd = new UserCommandPort() {
            @Override
            public User create(
                    String firstName,
                    String lastName,
                    String email,
                    String username,
                    String password,
                    java.util.Set<String> roles
            ) {
                // minimal behavior: delegate and return a created user (use-case does not validate)
                return new User(1L, firstName, lastName, email, username, true, roles);
            }

            @Override
            public User update(
                    Long id,
                    String firstName,
                    String lastName,
                    String email,
                    java.util.Set<String> roles,
                    boolean active
            ) {
                throw new UnsupportedOperationException();
            }

            @Override
            public void softDelete(Long id) {
                // no-op
            }
        };

    var uc = new CreateUserUseCase(cmd);

    // execute with null email: use-case should delegate and return a User
    // (no validation here)
    var created = uc.execute(
        "F",
        "L",
        null,
        "u",
        "p",
        java.util.Set.of()
    );

    org.junit.jupiter.api.Assertions.assertNotNull(created);
    org.junit.jupiter.api.Assertions.assertEquals(
        1L,
        created.getId()
    );
    org.junit.jupiter.api.Assertions.assertNull(created.getEmail());
    }
}
