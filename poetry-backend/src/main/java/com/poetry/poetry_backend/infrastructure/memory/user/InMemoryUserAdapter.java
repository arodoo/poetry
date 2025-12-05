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
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;
import com.poetry.poetry_backend.domain.user.model.core.User;

public class InMemoryUserAdapter implements UserQueryPort, UserCommandPort {
  private final Map<Long, User> store = new HashMap<>();
  private final AtomicLong seq = new AtomicLong(1);

  public List<User> findAll() {
    return new ArrayList<>(store.values());
  }

  public PageResult<User> findAllPaged(int page, int size, String search) {
    List<User> allUsers = new ArrayList<>(store.values());
    int totalElements = allUsers.size();
    int totalPages = (int) Math.ceil((double) totalElements / size);
    int startIndex = page * size;
    int endIndex = Math.min(startIndex + size, totalElements);
    List<User> pageContent =
        startIndex < totalElements
            ? allUsers.subList(startIndex, endIndex)
            : List.of();
    return new PageResult<>(
        pageContent, totalElements, totalPages, page, size);
  }

  public User findById(Long id) {
    return Optional.ofNullable(store.get(id))
        .orElseThrow(() -> new UserNotFoundException(id));
  }

  public User create(
      String f,
      String l,
      String e,
      String u,
      String locale,
      String p,
      Set<String> r,
      String status) {
    return InMemoryUserStore.create(store, seq, f, l, e, u,
        status != null ? status : "active",
        r != null ? r : Set.of("USER"));
  }

  public User update(
      Long id,
      long version,
      String f,
      String l,
      String e,
      String locale,
      Set<String> r,
      String status) {
  return Optional.ofNullable(InMemoryUserStore.update(store, id, f, l, e, locale,
    r != null ? r : null, status)).orElseThrow(() -> new UserNotFoundException(id));
  }

  public com.poetry.poetry_backend.domain.user.model.User updatePassword(
      Long id, long version, String password) {
    return Optional.ofNullable(InMemoryUserStore.updatePassword(store, id, password))
        .orElseThrow(() -> new UserNotFoundException(id));
  }

  public void softDelete(Long id, long version) {
    if (store.containsKey(id)) {
      InMemoryUserStore.softDelete(store, id);
    } else {
      throw new UserNotFoundException(id);
    }
  }
}
