/*
 * File: UserValidationTest.java
 * Purpose: Guard domain invariants by asserting invalid inputs are rejected
 * by the UserFactory.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.model;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Set;

import org.junit.jupiter.api.Test;

class UserValidationTest {
    @Test
    void createNewRejectsBlankEmail() {
        assertThrows(
                IllegalArgumentException.class,
                () -> UserFactory.createNew(
                        "Ada",
                        "Lovelace",
                        " ",
                        "ada",
                        "en",
                                Set.of("admin")));
    }
}
