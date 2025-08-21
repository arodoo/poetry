/*
 * File: InMemoryUserStore.java
 * Purpose: Helper utilities to perform create/update/soft-delete operations
 * on the in-memory user store. These methods encapsulate store mutation
 * logic so adapters remain compact, focused on their contracts and wiring.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.user;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

import com.poetry.poetry_backend.domain.user.model.User;

public final class InMemoryUserStore {
  private InMemoryUserStore() {
    // utility
  }

  public static User create(Map<Long, User> store, AtomicLong seq,
      String firstName, String lastName, String email, String username,
      boolean active, Set<String> roles) {
    Long id = seq.getAndIncrement();
    User user = InMemoryUserFactory.createNew(
        id,
        firstName,
        lastName,
        email,
        username,
        active,
        roles != null ? roles : Set.of("USER"));
    store.put(id, user);
    return user;
  }

  public static User update(Map<Long, User> store, Long id,
      String firstName, String lastName, String email,
      Set<String> roles, boolean active) {
    User ex = Optional.ofNullable(store.get(id)).orElseThrow();
    User up = InMemoryUserFactory.createNew(
        ex.getId(),
        firstName,
        lastName,
        email,
        ex.getUsername(),
        active,
        roles != null ? roles : ex.getRoles());
    store.put(id, up);
    return up;
  }

  public static void softDelete(Map<Long, User> store, Long id) {
    User ex = Optional.ofNullable(store.get(id)).orElseThrow();
    User up = InMemoryUserFactory.createNew(
        ex.getId(),
        ex.getFirstName(),
        ex.getLastName(),
        ex.getEmail(),
        ex.getUsername(),
        false,
        ex.getRoles());
    store.put(id, up);
  }
}
