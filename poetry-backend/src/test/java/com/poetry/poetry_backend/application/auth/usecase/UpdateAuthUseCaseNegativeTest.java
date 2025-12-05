/*
 * File: UpdateAuthUseCaseNegativeTest.java
 * Purpose: Negative path for invalid update inputs.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.auth.port.AuthCommandPort;
import com.poetry.poetry_backend.application.auth.usecase.crud.UpdateAuthUseCase;
import com.poetry.poetry_backend.domain.auth.model.Auth;

class UpdateAuthUseCaseNegativeTest {
  @Test
  void givenBlankUsernameShouldFail() {
    AuthCommandPort stub = new AuthCommandPort() {
      public Auth create(String id, String u) {
        return new Auth(id, u, false);
      }

      public Auth update(String id, String u) {
        return new Auth(id, u, false);
      }

      public void delete(String id) {
      }
    };
    var uc = new UpdateAuthUseCase(stub);
    var ex = assertThrows(IllegalArgumentException.class,
        () -> uc.execute("1", ""));
    assertEquals("auth.username.blank", ex.getMessage());
  }
}
