/*
 * File: GetAllUsersUseCaseTest.java
 * Purpose: Placeholder list use case test.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.model.User;

class GetAllUsersUseCaseTest {
  @Test
  void returnsUsers() {
    UserQueryPort query = new UserQueryPort() {
      public List<User> findAll() {
        return java.util.List.of();
      }

      public PageResult<User> findAllPaged(int page, int size, String search) {
        return new PageResult<>(java.util.List.of(), 0, 0, page, size);
      }

      public User findById(Long id) {
        return null;
      }
    };
    var uc = new GetAllUsersUseCase(query);
    assertEquals(0, uc.execute().size());
  }
}
