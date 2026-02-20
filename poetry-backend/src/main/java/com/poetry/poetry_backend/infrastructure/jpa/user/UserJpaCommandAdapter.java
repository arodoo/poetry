/*
 * File: UserJpaCommandAdapter.java
 * Purpose: Handles user command operations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import static com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaCommandSupport.applyProfile;
import static com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaCommandSupport.guard;
import static com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaCommandSupport.persist;

import java.time.Instant;
import java.util.Set;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.model.core.User;

public class UserJpaCommandAdapter implements UserCommandPort {
  private final UserJpaRepository repository;

  public UserJpaCommandAdapter(UserJpaRepository repository) {
    this.repository = repository;
  }

  @Override
  public User create(String firstName, String lastName, String email,
      String username, String locale, String password, Set<String> roles,
      String status) {
    UserEntity entity = new UserEntity();
    applyProfile(entity, firstName, lastName, email, locale);
    entity.setUsername(username);
    if (password != null && !password.isBlank()) {
      entity.setPasswordHash(password);
    }
    entity.setRoles(roles);
    entity.setStatus(status != null ? status : "active");
    return persist(repository, entity);
  }

  @Override
  public User update(Long id, long version, String firstName, String lastName,
      String email, String locale, Set<String> roles, String status) {
    UserEntity entity = guard(repository, id, version);
    applyProfile(entity, firstName, lastName, email, locale);
    entity.setRoles(roles);
    entity.setStatus(status);
    return persist(repository, entity);
  }

  @Override
  public User updatePassword(Long id, long version, String password) {
    UserEntity entity = guard(repository, id, version);
    entity.setPasswordHash(password);
    return persist(repository, entity);
  }

  @Override
  public void softDelete(Long id, long version) {
    UserEntity entity = guard(repository, id, version);
    entity.setStatus("inactive");
    entity.setDeletedAt(Instant.now());
    repository.save(entity);
  }
}