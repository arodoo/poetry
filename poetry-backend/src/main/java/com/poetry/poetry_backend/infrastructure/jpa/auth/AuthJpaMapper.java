/*
 * File: AuthJpaMapper.java
 * Purpose: Maps between Auth domain and JPA entity.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import com.poetry.poetry_backend.domain.auth.model.Auth;

public class AuthJpaMapper {
  public Auth toDomain(AuthEntity e) {
    return new Auth(e.getId(), e.getUsername(), e.isDeleted());
  }

  public AuthEntity toEntity(Auth d) {
    return new AuthEntity(d.id(), d.username(), d.deleted());
  }
}
