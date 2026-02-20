/*
 * File: InMemoryUserFactory.java
 * Purpose: Small factory to build User domain instances for the in-memory
 * adapter. Keeps construction logic outside the adapter to keep the adapter
 * concise and within the configured max-lines rules.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.user;

import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.domain.user.model.core.UserRehydrator;

public final class InMemoryUserFactory {
  private InMemoryUserFactory() { }

  public static User createNew(Long id, String f, String l,
      String e, String u, String status, Set<String> roles) {
    return UserRehydrator.rehydrate(
        id, f, l, e, u, "en", status, roles,
        null, null, null,
        null, null, null, null, null, null,
        java.time.Instant.now(),
        java.time.Instant.now(),
        null, 1L);
  }
}
