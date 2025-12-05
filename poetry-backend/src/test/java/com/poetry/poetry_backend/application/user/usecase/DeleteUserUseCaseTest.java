/*
 * File: DeleteUserUseCaseTest.java
 * Purpose: Placeholder delete use case test.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.core.User;

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
          String loc,
          String p,
          java.util.Set<String> r,
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
          java.util.Set<String> r,
          String status) {
        return null;
      }

      public User updatePassword(Long id, long version, String password) {
        return null;
      }

      public void softDelete(Long id, long version) {
        deleted[0] = id;
      }
    };
    var uc = new DeleteUserUseCase(commands);
    uc.execute(11L, 1L);
    assertEquals(11L, deleted[0]);
  }
}
