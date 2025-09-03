/*
 * File: GetAllUsersUseCaseTest.java
 * Purpose: Placeholder list use case test.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.user.model.User;

class GetAllUsersUseCaseTest {
  @Test
  void returnsUsers() {
    UserQueryPort query = new UserQueryPort() {
      public List<User> findAll() { return List.of(new User(1L,"F","L","e","u",true, Set.of())); }
      public User findById(Long id) { return null; }
    };
    var uc = new GetAllUsersUseCase(query);
    assertEquals(1, uc.execute().size());
  }
}
