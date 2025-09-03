/*
 * File: UserJpaAdapter.java
 * Purpose: Main adapter delegating to query and command adapters.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.port.UserQueryPort;

@Transactional
public class UserJpaAdapter implements UserQueryPort, UserCommandPort {
  private final UserJpaQueryAdapter queryAdapter;
  private final UserJpaCommandAdapter commandAdapter;

  public UserJpaAdapter(UserJpaRepository repo) {
    this.queryAdapter = new UserJpaQueryAdapter(repo);
    this.commandAdapter = new UserJpaCommandAdapter(repo);
  }

  public List<com.poetry.poetry_backend.domain.user.model.User> findAll() {
    return queryAdapter.findAll();
  }

  public com.poetry.poetry_backend.domain.user.model.User findById(Long id) {
    return queryAdapter.findById(id);
  }

  public com.poetry.poetry_backend.domain.user.model.User create(
      String f,
      String l,
      String e,
      String u,
      String p,
      java.util.Set<String> r) {
    return commandAdapter.create(f, l, e, u, p, r);
  }

  public com.poetry.poetry_backend.domain.user.model.User update(
      Long id,
      String f,
      String l,
      String e,
      java.util.Set<String> r,
      boolean a) {
    return commandAdapter.update(id, f, l, e, r, a);
  }

  public void softDelete(Long id) {
    commandAdapter.softDelete(id);
  }
}
