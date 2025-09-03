/*
 * File: UserJpaCommandAdapter.java
 * Purpose: Handles user command operations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;

public class UserJpaCommandAdapter implements UserCommandPort {
  private final UserJpaRepository repo;

  public UserJpaCommandAdapter(UserJpaRepository repo) {
    this.repo = repo;
  }

  public com.poetry.poetry_backend.domain.user.model.User create(
      String f,
      String l,
      String e,
      String u,
      String p,
      java.util.Set<String> r) {
    UserEntity en = new UserEntity();
    en.setFirstName(f);
    en.setLastName(l);
    en.setEmail(e);
    en.setUsername(u);
    en.setPasswordHash(p);
    en.setRoles(r);
    en.setActive(true);
    return UserJpaMapper.toDomain(repo.save(en));
  }

  public com.poetry.poetry_backend.domain.user.model.User update(
      Long id,
      String f,
      String l,
      String e,
      java.util.Set<String> r,
      boolean a) {
    UserEntity en = repo.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    en.setFirstName(f);
    en.setLastName(l);
    en.setEmail(e);
    en.setRoles(r);
    en.setActive(a);
    return UserJpaMapper.toDomain(repo.save(en));
  }

  public void softDelete(Long id) {
    UserEntity en = repo.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    en.setActive(false);
    repo.save(en);
  }
}