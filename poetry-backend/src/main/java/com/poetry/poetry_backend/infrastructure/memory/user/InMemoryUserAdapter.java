/*
 * File: InMemoryUserAdapter.java
 * Purpose: In-memory implementation of user ports used for development and
 * testing. This adapter stores User domain objects in a local Map and provides
 * simple create, read, update and soft-delete operations conforming to the
 * UserCommandPort and UserQueryPort contracts without introducing persistence
 * concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.memory.user;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;
import com.poetry.poetry_backend.domain.user.model.User;

public class InMemoryUserAdapter implements UserQueryPort, UserCommandPort {
  private final Map<Long, User> store = new HashMap<>();
  private final AtomicLong seq = new AtomicLong(1);

  public List<User> findAll() {
    return new ArrayList<>(store.values());
  }

  public User findById(Long id) {
    return Optional.ofNullable(store.get(id)).orElseThrow(() -> new UserNotFoundException(id));
  }

  public User create(
      String f,
      String l,
      String e,
      String u,
      String p,
      Set<String> r) {
    return InMemoryUserStore.create(store, seq, f, l, e, u, true,
        r != null ? r : Set.of("USER"));
  }

  public User update(
      Long id,
      String f,
      String l,
      String e,
      Set<String> r,
      boolean a) {
  return Optional.ofNullable(InMemoryUserStore.update(store, id, f, l, e,
    r != null ? r : null, a)).orElseThrow(() -> new UserNotFoundException(id));
  }

  public void softDelete(Long id) {
    if (store.containsKey(id)) {
      InMemoryUserStore.softDelete(store, id);
    } else {
      throw new UserNotFoundException(id);
    }
  }
}
