/*
 * File: TestUserStubs.java
 * Purpose: Provide reusable test stubs for user use case tests. This keeps
 * test files compact by centralizing common anonymous classes.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.user.usecase;

import java.util.Set;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.model.User;

public final class TestUserStubs {
  private TestUserStubs() {}

  public static UserCommandPort simpleCommandPort() {
    return new UserCommandPort() {
      @Override
      public User create(
          String firstName,
          String lastName,
          String email,
          String username,
          String locale,
          String password,
          Set<String> roles,
          String status
      ) {
        return new User(
            1L,
            firstName,
            lastName,
            email,
            username,
            locale,
            status != null ? status : "active",
            roles,
            null,
            null,
            null,
            0L
        );
      }

      @Override
      public User update(
          Long id,
          long version,
          String firstName,
          String lastName,
          String email,
          String locale,
          Set<String> roles,
          String status
      ) {
        throw new UnsupportedOperationException();
      }

      @Override
      public User updatePassword(Long id, long version, String password) {
        throw new UnsupportedOperationException();
      }

      @Override
      public void softDelete(Long id, long version) {
        // no-op
      }
    };
  }

  public static UserQueryPort simpleQueryPort() {
    return new UserQueryPort() {
      public java.util.List<User> findAll() {
        return java.util.List.of();
      }

      public PageResult<User> findAllPaged(int page, int size, String search) {
        return new PageResult<>(java.util.List.of(), 0, 0, page, size);
      }

      public User findById(Long id) {
        return null;
      }
    };
  }
}
