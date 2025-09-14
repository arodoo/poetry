/*
 * File: UpdateAuthUseCaseTest.java
 * Purpose: Tests update use case happy path.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.auth.port.AuthCommandPort;
import com.poetry.poetry_backend.domain.auth.model.Auth;

class UpdateAuthUseCaseTest {
  @Test void updatesAuth() {
    AuthCommandPort stub = new AuthCommandPort() {
      public Auth create(String id, String u) { return new Auth(id, u, false); }
      public Auth update(String id, String u) { return new Auth(id, u, false); }
      public void delete(String id) { }
    };
    var uc = new UpdateAuthUseCase(stub);
    assertEquals("u2", uc.execute("1", "u2").username());
  }
}
