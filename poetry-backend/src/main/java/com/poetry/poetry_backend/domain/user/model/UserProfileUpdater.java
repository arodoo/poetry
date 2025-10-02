/*
 * File: UserProfileUpdater.java
 * Purpose: Apply validated profile changes to a User aggregate by
 * delegating to UserRehydrator with canonical validation rules.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model;

public final class UserProfileUpdater {
  private UserProfileUpdater() { }

  public static User update(User base, String firstName, String lastName, String email) {
    return UserRehydrator.rehydrate(
        base.id(),
        UserValidator.requireName("firstName", firstName),
        UserValidator.requireName("lastName", lastName),
        UserValidator.requireEmail(email),
        base.username(),
        base.locale(),
        base.active(),
        base.roles(),
        base.createdAt(),
        base.updatedAt(),
        base.deletedAt(),
        base.version());
  }
}
