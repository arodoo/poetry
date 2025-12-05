/*
 * File: InMemoryUserMutations.java
 * Purpose: Small helper utilities for mutation operations used by
 * InMemoryUserStore to keep the store class compact and within line
 * limits. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.user;

import java.time.Instant;
import java.util.Map;

import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;
import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.domain.user.model.updaters.UserMutations;

public final class InMemoryUserMutations {
  private InMemoryUserMutations() {}

  public static User updatePassword(Map<Long, User> store, Long id, String password) {
    User ex = java.util.Optional.ofNullable(store.get(id))
        .orElseThrow(() -> new UserNotFoundException(id));
    User updated = UserMutations.updatePassword(ex, password);
    store.put(id, updated);
    return updated;
  }

  public static void softDelete(Map<Long, User> store, Long id) {
    User ex = java.util.Optional.ofNullable(store.get(id))
        .orElseThrow(() -> new UserNotFoundException(id));
    User deleted = UserMutations.markDeleted(ex, Instant.now());
    store.put(id, deleted);
  }
}
