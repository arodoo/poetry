/*
 * File: GetUserByIdUseCaseTest.java
 * Purpose: Placeholder get-by-id use case test.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;
import com.poetry.poetry_backend.domain.user.model.User;

class GetUserByIdUseCaseTest {
  @Test
  void returnsUser() {
    UserQueryPort query = new UserQueryPort() {
      public java.util.List<User> findAll() { return java.util.List.of(); }
      public PageResult<User> findAllPaged(int p, int s, String search) {
        return new PageResult<>(java.util.List.of(), 0, 0, p, s);
      }
      public User findById(Long id) {
        return new User(
            id,
            "F",
            "L",
            "e",
            "u",
            "en",
            "active",
            Set.of("ROLE_USER"),
            null,
            null,
            null,
            0L
        );
      }
    };
    var uc = new GetUserByIdUseCase(query);
  assertEquals(5L, uc.execute(5L).id());
  }

  @Test
  void notFoundThrows() {
    UserQueryPort query = new UserQueryPort() {
      public java.util.List<User> findAll() { return java.util.List.of(); }
      public PageResult<User> findAllPaged(int p, int s, String search) {
        return new PageResult<>(java.util.List.of(), 0, 0, p, s);
      }
      public User findById(Long id) { return null; }
    };
    var uc = new GetUserByIdUseCase(query);
    assertThrows(UserNotFoundException.class, () -> uc.execute(9L));
  }
}
