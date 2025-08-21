/*
 * File: UserJpaAdapter.java
 * Purpose: JPA adapter implementing user persistence and retrieval
 * operations required by application ports. This adapter maps between
 * UserEntity and domain models and ensures repository interactions are
 * encapsulated within infrastructure, adhering to DIP and separation of
 * concerns.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.port.UserQueryPort;

@Transactional
public class UserJpaAdapter implements UserQueryPort, UserCommandPort {
  private final UserJpaRepository repo;

  public UserJpaAdapter(UserJpaRepository repo) {
    this.repo = repo;
  }

  public List<com.poetry.poetry_backend.domain.user.model.User> findAll() {
    return repo.findAllActive().stream()
        .map(UserJpaMapper::toDomain)
        .toList();
  }

  public com.poetry.poetry_backend.domain.user.model.User findById(Long id) {
    return repo.findActiveById(id).map(UserJpaMapper::toDomain).orElseThrow();
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
    UserEntity en = repo.findById(id).orElseThrow();
    en.setFirstName(f);
    en.setLastName(l);
    en.setEmail(e);
    en.setRoles(r);
    en.setActive(a);
    return UserJpaMapper.toDomain(repo.save(en));
  }

  public void softDelete(Long id) {
    UserEntity en = repo.findById(id).orElseThrow();
    en.setActive(false);
    repo.save(en);
  }
}
