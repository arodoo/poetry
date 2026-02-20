/*
 * File: InMemoryUserCreate.java
 * Purpose: Isolate create helper for in-memory store to keep
 * InMemoryUserStore compact. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.user;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.domain.user.model.core.UserFactory;
import com.poetry.poetry_backend.domain.user.model.core.UserRehydrator;
import com.poetry.poetry_backend.domain.user.model.updaters.UserMutations;

public final class InMemoryUserCreate {
  private InMemoryUserCreate() {}

  public static User create(
      Map<Long, User> store,
      AtomicLong seq,
      String firstName,
      String lastName,
      String email,
      String username,
      String status,
      Set<String> roles
  ) {
    Long id = seq.getAndIncrement();
    User user = UserFactory.createNew(
      firstName,
      lastName,
      email,
      username,
      "en",
      roles != null ? roles : Set.of("USER")
    );
    User rehydrated = UserMutations.updateStatus(
      UserRehydrator.rehydrate(
        id,
        user.firstName(),
        user.lastName(),
        user.email(),
        user.username(),
        user.locale(),
        user.status(),
        user.roles(),
        user.createdAt(),
        user.updatedAt(),
        user.deletedAt(),
        user.version()),
      status);
    store.put(id, rehydrated);
    return rehydrated;
  }
}
