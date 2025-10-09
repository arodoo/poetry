/*
 * File: UserRolesUpdater.java
 * Purpose: Update user roles ensuring at least one role remains assigned.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model;

import java.util.Set;

public final class UserRolesUpdater {
  private UserRolesUpdater() { }

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
