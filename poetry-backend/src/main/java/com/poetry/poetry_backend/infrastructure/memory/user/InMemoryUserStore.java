/*
 * File: InMemoryUserStore.java
 * Purpose: Helper utilities to perform create/update/soft-delete operations
 * on the in-memory user store. These methods encapsulate store mutation
 * logic so adapters remain compact, focused on their contracts and wiring.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.user;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;
import com.poetry.poetry_backend.domain.user.model.User;
import com.poetry.poetry_backend.domain.user.model.UserMutations;

public final class InMemoryUserStore {
  private InMemoryUserStore() {
    // utility
  }

  public static User create(Map<Long, User> store, AtomicLong seq,
      String firstName, String lastName, String email, String username,
      boolean active, Set<String> roles) {
    return InMemoryUserCreate.create(store, seq, firstName, lastName,
        email, username, active, roles);
  }

  public static User update(Map<Long, User> store, Long id,
      String firstName, String lastName, String email, String locale,
      Set<String> roles, boolean active) {
  User ex = Optional.ofNullable(store.get(id))
    .orElseThrow(() -> new UserNotFoundException(id));
  User updatedProfile = UserMutations.updateProfile(
    ex,
    firstName,
    lastName,
    email);
  User updatedRoles = roles == null
    ? updatedProfile
    : UserMutations.updateRoles(updatedProfile, roles);
  User updatedActive = UserMutations.updateActive(updatedRoles, active);
  store.put(id, updatedActive);
  return updatedActive;
  }

  public static User updatePassword(Map<Long, User> store, Long id, String password) {
    return InMemoryUserMutations.updatePassword(store, id, password);
  }

  public static void softDelete(Map<Long, User> store, Long id) {
    InMemoryUserMutations.softDelete(store, id);
  }
}
