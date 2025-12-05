/*
 * File: UpdateUserUseCaseTest.java
 * Purpose: Placeholder update use case test.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.core.User;

class UpdateUserUseCaseTest {
  @Test
  void updatesUser() {
    UserCommandPort commands = new UserCommandPort() {
      public User create(
          String f,
          String l,
          String e,
          String u,
          String loc,
          String p,
          Set<String> r,
          String status) {
        return null;
      }

      public User update(
          Long id,
          long version,
          String f,
          String l,
          String e,
          String loc,
          Set<String> r,
          String status) {
        return new User(id, f, l, e, "u", loc, status, r, null, null, null, version);
      }

      public User updatePassword(Long id, long version, String password) {
        return null;
      }

      public void softDelete(Long id, long version) {
      }
    };
    var uc = new UpdateUserUseCase(commands);
    var updated = uc.execute(
        7L,
        1L,
        "NF",
        "NL",
        "ne",
        "en",
        Set.of("R"),
        "inactive");
    assertEquals(7L, updated.id());
    assertEquals("inactive", updated.status());
  }
}
