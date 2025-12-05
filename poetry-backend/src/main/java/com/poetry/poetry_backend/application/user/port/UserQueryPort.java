/*
 * File: UserQueryPort.java
 * Purpose: Define query operations to retrieve user information used by the
 * application layer. This port abstracts read-only access to user data so that
 * use-cases remain decoupled from storage details and can be tested against
 * fake or in-memory implementations. The port centralizes read semantics.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.port;

import java.util.List;

import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.model.core.User;

public interface UserQueryPort {
  List<User> findAll();

  PageResult<User> findAllPaged(int page, int size, String search);

  User findById(Long id);
}
