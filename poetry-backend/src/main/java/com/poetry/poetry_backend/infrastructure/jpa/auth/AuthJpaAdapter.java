/*
 * File: AuthJpaAdapter.java
 * Purpose: JPA adapter implementing auth ports with soft delete.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.auth.port.AuthCommandPort;
import com.poetry.poetry_backend.application.auth.port.AuthQueryPort;
import com.poetry.poetry_backend.domain.auth.model.Auth;
import com.poetry.poetry_backend.infrastructure.jpa.auth.entity.AuthEntity;
import com.poetry.poetry_backend.infrastructure.jpa.auth.repository.AuthJpaRepository;

@Repository
@Transactional
public class AuthJpaAdapter implements AuthQueryPort, AuthCommandPort {
  private final AuthJpaRepository repo;
  private final AuthJpaMapper mapper = new AuthJpaMapper();

  public AuthJpaAdapter(AuthJpaRepository repo) {
    this.repo = repo;
  }

  public List<Auth> findAll() {
    return repo.findByDeletedFalse().stream()
        .map(mapper::toDomain).collect(Collectors.toList());
  }

  public Optional<Auth> findById(String id) {
    return repo.findById(id).filter(e -> !e.isDeleted()).map(mapper::toDomain);
  }

  public Auth create(String id, String username) {
    var d = new Auth(id, username, false);
    var e = repo.save(mapper.toEntity(d));
    return mapper.toDomain(e);
  }

  public Auth update(String id, String username) {
    var e = repo.findById(id).orElse(new AuthEntity(id, username, false));
    e.setUsername(username);
    return mapper.toDomain(repo.save(e));
  }

  public void delete(String id) {
    repo.findById(id).ifPresent(e -> {
      e.setDeleted(true);
      repo.save(e);
    });
  }
}
