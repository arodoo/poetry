/*
 * File: InMemoryUserFactory.java
 * Purpose: Small factory to build User domain instances for the in-memory
 * adapter. Keeps construction logic outside the adapter to keep the adapter
 * concise and within the configured max-lines rules.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.user;

import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.User;

public final class InMemoryUserFactory {
  private InMemoryUserFactory() {
    // utility
  }

  public static User createNew(Long id, String f, String l, String e,
      String u, boolean active, Set<String> roles) {
    return new User(id, f, l, e, u, active, roles);
  }
}
