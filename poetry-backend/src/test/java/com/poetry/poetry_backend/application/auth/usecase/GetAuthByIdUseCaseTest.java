/*
 * File: GetAuthByIdUseCaseTest.java
 * Purpose: Tests fetching auth by id and not found path.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.auth.port.AuthQueryPort;
import com.poetry.poetry_backend.domain.auth.exception.AuthNotFoundException;
import com.poetry.poetry_backend.domain.auth.model.Auth;

class GetAuthByIdUseCaseTest {
  @Test void returnsAuth() {
    AuthQueryPort q = new AuthQueryPort() {
      public java.util.List<Auth> findAll() { return java.util.List.of(); }
      public Optional<Auth> findById(String id) {
        return Optional.of(new Auth(id, "u", false));
      }
    };
    var uc = new GetAuthByIdUseCase(q);
    assertEquals("1", uc.execute("1").id());
  }

  @Test void whenMissingShouldReturn404() {
    AuthQueryPort q = new AuthQueryPort() {
      public java.util.List<Auth> findAll() { return java.util.List.of(); }
      public Optional<Auth> findById(String id) { return Optional.empty(); }
    };
    var uc = new GetAuthByIdUseCase(q);
    assertThrows(AuthNotFoundException.class, () -> uc.execute("x"));
  }
}
