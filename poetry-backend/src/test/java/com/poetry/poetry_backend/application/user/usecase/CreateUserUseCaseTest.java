/*
 * File: CreateUserUseCaseTest.java
 * Purpose: Validates create user use case command wiring.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Set;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.User;
import com.poetry.poetry_backend.domain.user.model.UserRehydrator;

class CreateUserUseCaseTest {
  @Test
  void createsUser() {
    UserCommandPort commands = new UserCommandPort() {
      @Override
      public User create(
          String f,
          String l,
          String e,
          String u,
          String loc,
          String p,
          Set<String> r,
          String status) {
        return UserRehydrator.rehydrate(10L, f, l, e, u, loc,
            status != null ? status : "active", r, null, null, null, 0L);
      }

      @Override
      public User update(
          Long id,
          long version,
          String f,
          String l,
          String e,
          String loc,
          Set<String> r,
          String status) {
        return null;
      }

      @Override
      public User updatePassword(Long id, long version, String password) {
        return null;
      }

      @Override
      public void softDelete(Long id, long version) { }
    };
    var uc = new CreateUserUseCase(commands);
    var user = uc.execute(
        "F",
        "L",
  "user@example.com",
        "u",
        "en",
        "p",
        Set.of("ROLE_USER"),
        "active"
    );
    assertNotNull(user);
  }
}
