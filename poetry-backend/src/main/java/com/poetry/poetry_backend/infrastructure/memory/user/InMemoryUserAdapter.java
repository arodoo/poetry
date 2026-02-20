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

import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;
import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.interfaces.v1.user.dto.AddressRequest;

public class InMemoryUserAdapter implements UserQueryPort, UserCommandPort {
  private final Map<Long, User> store = new HashMap<>();
  private final AtomicLong seq = new AtomicLong(1);

  public List<User> findAll() {
    return new ArrayList<>(store.values());
  }

  public PageResult<User> findAllPaged(
      int page, int size, String search, String sort) {
    List<User> all = new ArrayList<>(store.values());
    int total = all.size();
    int pages = (int) Math.ceil((double) total / size);
    int start = page * size;
    int end = Math.min(start + size, total);
    List<User> content = start < total
        ? all.subList(start, end) : List.of();
    return new PageResult<>(content, total, pages, page, size);
  }

  public User findById(Long id) {
    return Optional.ofNullable(store.get(id))
        .orElseThrow(() -> new UserNotFoundException(id));
  }

  public List<User> findAllById(List<Long> ids) {
    return ids.stream().map(store::get)
        .filter(Objects::nonNull).toList();
  }

  public User create(
      String f, String l, String e, String u,
      String locale, String p, Set<String> r,
      String status, LocalDate birthDate,
      String gender, String phone,
      AddressRequest address) {
    return InMemoryUserStore.create(store, seq, f, l, e, u,
        status != null ? status : "active",
        r != null ? r : Set.of("USER"));
  }

  public User update(
      Long id, long version,
      String f, String l, String e, String locale,
      Set<String> r, String status,
      LocalDate birthDate, String gender,
      String phone, AddressRequest address) {
    return Optional.ofNullable(
        InMemoryUserStore.update(store, id, f, l, e, locale,
            r != null ? r : null, status))
        .orElseThrow(() -> new UserNotFoundException(id));
  }

  public User updatePassword(Long id, long version, String p) {
    return Optional.ofNullable(
        InMemoryUserStore.updatePassword(store, id, p))
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
