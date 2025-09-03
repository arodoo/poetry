/*
 * File: CreateUserUseCaseTest.java
 * Purpose: Placeholder create use case test.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.User;

class CreateUserUseCaseTest {
  @Test
  void createsUser() {
    UserCommandPort commands = new UserCommandPort() {
      public User create(
          String f,
          String l,
          String e,
          String u,
          String p,
          Set<String> r) {
        return new User(10L, f, l, e, u, true, r);
      }

      public User update(
          Long id,
          String f,
          String l,
          String e,
          Set<String> r,
          boolean active) {
        return null;
      }

      public void softDelete(Long id) { }
    };
    var uc = new CreateUserUseCase(commands);
    var user = uc.execute(
        "F",
        "L",
        "e@x",
        "u",
        "p",
        Set.of("ROLE_USER")
    );
    assertNotNull(user.getId());
  }
}
