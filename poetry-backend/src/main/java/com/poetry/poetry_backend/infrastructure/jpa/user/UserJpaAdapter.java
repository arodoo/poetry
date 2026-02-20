/*
 * File: UserJpaAdapter.java
 * Purpose: Main adapter delegating to query and command adapters.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.user.port.UserCommandPort;
import com.poetry.poetry_backend.application.user.port.UserQueryPort;
import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.interfaces.v1.user.dto.AddressRequest;

@Service
@Transactional
public class UserJpaAdapter implements UserQueryPort, UserCommandPort {
  private final UserJpaQueryAdapter queryAdapter;
  private final UserJpaCommandAdapter commandAdapter;

  public UserJpaAdapter(UserJpaRepository repo) {
    this.queryAdapter = new UserJpaQueryAdapter(repo);
    this.commandAdapter = new UserJpaCommandAdapter(repo);
  }

  public List<com.poetry.poetry_backend.domain.user.model.core.User> findAll() {
    return queryAdapter.findAll();
  }

  public PageResult<com.poetry.poetry_backend.domain.user.model.core.User> findAllPaged(
      int page, int size,
      String search, String sort) {
    return queryAdapter.findAllPaged(
        page, size, search, sort);
  }

  public com.poetry.poetry_backend.domain.user.model.core.User findById(Long id) {
    return queryAdapter.findById(id);
  }

  public List<com.poetry.poetry_backend.domain.user.model.core.User> findAllById(List<Long> ids) {
    return queryAdapter.findAllById(ids);
  }

  public com.poetry.poetry_backend.domain.user.model.core.User create(
      String f, String l, String e, String u, String locale, String p,
      java.util.Set<String> r, String status,
      LocalDate birthDate, String gender, String phone, AddressRequest address) {
    return commandAdapter.create(
        f, l, e, u, locale, p, r, status, birthDate, gender, phone, address);
  }

  public com.poetry.poetry_backend.domain.user.model.core.User update(
      Long id, long version,
      String f, String l, String e, String locale,
      java.util.Set<String> r, String status,
      LocalDate birthDate, String gender, String phone, AddressRequest address) {
    return commandAdapter.update(
        id, version, f, l, e, locale, r, status, birthDate, gender, phone, address);
  }

  public com.poetry.poetry_backend.domain.user.model.core.User updatePassword(
      Long id, long version, String password) {
    return commandAdapter.updatePassword(id, version, password);
  }

  public void softDelete(Long id, long version) {
    commandAdapter.softDelete(id, version);
  }
}
