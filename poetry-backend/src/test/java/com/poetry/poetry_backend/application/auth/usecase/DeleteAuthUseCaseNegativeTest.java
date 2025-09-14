/*
 * File: DeleteAuthUseCaseNegativeTest.java
 * Purpose: Negative path placeholder for delete (soft delete behavior).
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.auth.port.AuthCommandPort;
import com.poetry.poetry_backend.domain.auth.model.Auth;

class DeleteAuthUseCaseNegativeTest {
  @Test void whenMissingShouldNotThrow() {
    AuthCommandPort stub = new AuthCommandPort() {
      public Auth create(String id, String u) { return new Auth(id, u, false); }
      public Auth update(String id, String u) { return new Auth(id, u, false); }
      public void delete(String id) { /* no-op */ }
    };
    var uc = new DeleteAuthUseCase(stub);
    assertDoesNotThrow(() -> uc.execute("missing"));
  }
}
