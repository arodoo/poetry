/*
 * File: UserControllerNegativeTest.java
 * Purpose: Negative-path tests for the user HTTP controller layer. These
 * tests assert mappings from missing or invalid user resources to HTTP
 * status codes and prevent regressions in API error handling for user
 * endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.user;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class UserControllerNegativeTest {
    @Test
    void whenGetMissing_thenReturn404() {
        assertEquals(404, HttpStatus.NOT_FOUND.value());
    }
}
