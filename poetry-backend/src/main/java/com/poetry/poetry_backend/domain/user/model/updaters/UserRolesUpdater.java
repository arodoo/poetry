/*
 * File: UserRolesUpdater.java
 * Purpose: Update user roles ensuring at least one role remains assigned.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model.updaters;

import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.domain.user.model.core.UserRehydrator;
import com.poetry.poetry_backend.domain.user.model.core.UserValidator;

public final class UserRolesUpdater {
  private UserRolesUpdater() {
  }

  public static User update(User base, Set<String> roles) {
    return UserRehydrator.rehydrate(
        base.id(),
        base.firstName(),
        base.lastName(),
        base.email(),
        base.username(),
        base.locale(),
        base.status(),
        UserValidator.requireRoles(roles),
        base.createdAt(),
        base.updatedAt(),
        base.deletedAt(),
        base.version());
  }
}
