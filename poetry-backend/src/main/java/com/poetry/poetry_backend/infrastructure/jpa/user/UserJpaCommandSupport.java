/*
 * File: UserJpaCommandSupport.java
 * Purpose: Shared helpers for user command adapter logic.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.user;

import com.poetry.poetry_backend.domain.user.exception.UserNotFoundException;
import com.poetry.poetry_backend.domain.user.exception.UserVersionMismatchException;
import com.poetry.poetry_backend.domain.user.model.core.User;

final class UserJpaCommandSupport {
  private UserJpaCommandSupport() {}

  static void applyProfile(
      UserEntity entity, String firstName, String lastName, String email, String locale) {
    entity.setFirstName(firstName);
    entity.setLastName(lastName);
    entity.setEmail(email);
    entity.setLocale(locale);
  }

  static UserEntity guard(UserJpaRepository repository, Long id, long version) {
    UserEntity entity =
        repository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    Long currentVersion = entity.getVersion();
    if (currentVersion != null && !currentVersion.equals(version)) {
      throw new UserVersionMismatchException(id);
    }
    return entity;
  }

  static User persist(UserJpaRepository repository, UserEntity entity) {
    return UserJpaMapper.toDomain(repository.save(entity));
  }
}
