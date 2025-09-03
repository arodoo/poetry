/*
 * File: DeleteUserUseCaseTest.java
 * Purpose: Placeholder delete use case test.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.User;

class DeleteUserUseCaseTest {
  @Test
  void deletesUser() {
    final long[] deleted = {0};
    UserCommandPort commands = new UserCommandPort() {
      public User create(
          String f,
          String l,
          String e,
          String u,
          String p,
          java.util.Set<String> r) {
        return null;
      }

      public User update(
          Long id,
          String f,
          String l,
          String e,
          java.util.Set<String> r,
          boolean a) {
        return null;
      }

      public void softDelete(Long id) {
        deleted[0] = id;
      }
    };
    var uc = new DeleteUserUseCase(commands);
    uc.execute(11L);
    assertEquals(11L, deleted[0]);
  }
}
