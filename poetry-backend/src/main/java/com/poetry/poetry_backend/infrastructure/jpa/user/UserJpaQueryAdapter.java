/*
 * File: UserJpaQueryAdapter.java
 * Purpose: Handles user query operations with pagination support.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;
import com.poetry.poetry_backend.infrastructure.jpa.common.SortParser;

public class UserJpaQueryAdapter implements UserQueryPort {
  private final UserJpaRepository repo;
  private static final Set<String> SORTABLE = Set.of(
      "username", "email", "firstName", "lastName", "status", "createdAt");

  public UserJpaQueryAdapter(UserJpaRepository repo) {
    this.repo = repo;
  }

  public List<com.poetry.poetry_backend.domain.user.model.core.User> findAll() {
    return repo.findAllActive().stream()
        .map(UserJpaMapper::toDomain)
        .toList();
  }

  public PageResult<com.poetry.poetry_backend.domain.user.model.core.User> findAllPaged(
      int page, int size,
      String search, String sort) {
    Sort ordering = SortParser.parse(sort, SORTABLE);
    Pageable pageable = PageRequest.of(page, size, ordering);
    Page<UserEntity> pageResult = (search == null || search.isEmpty())
        ? repo.findAllActive(pageable)
        : repo.searchActive(search, pageable);
    List<com.poetry.poetry_backend.domain.user.model.core.User> users = pageResult.getContent().stream()
        .map(UserJpaMapper::toDomain)
        .toList();
    return new PageResult<>(
        users,
        pageResult.getTotalElements(),
        pageResult.getTotalPages(),
        pageResult.getNumber(),
        pageResult.getSize());
  }

  public com.poetry.poetry_backend.domain.user.model.core.User findById(Long id) {
    return repo.findActiveById(id)
        .map(UserJpaMapper::toDomain)
        .orElseThrow(() -> new UserNotFoundException(id));
  }

  public List<com.poetry.poetry_backend.domain.user.model.core.User> findAllById(List<Long> ids) {
    return repo.findAllById(ids).stream()
        .map(UserJpaMapper::toDomain)
        .toList();
  }
}