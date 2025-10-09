/*
 * File: UserMutations.java
 * Purpose: Facade exposing user mutation helpers while keeping legacy call
 * sites stable. Delegates to dedicated updater classes so each concern stays
 * small and testable within the enforced file length budget.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model;

import java.util.Set;

public final class UserMutations {
  private UserMutations() { }

  public static User updateProfile(User base, String firstName, String lastName, String email) {
    return UserProfileUpdater.update(base, firstName, lastName, email);
  }

  public static User updateRoles(User base, Set<String> roles) {
    return UserRolesUpdater.update(base, roles);
  }

  public static User updatePassword(User base, String passwordHash) {
    return UserPasswordUpdater.update(base, passwordHash);
  }

  public static User updateStatus(User base, String status) {
    return UserLifecycleManager.updateStatus(base, status);
  }

  public static User markDeleted(User base, java.time.Instant deletedAt) {
    return UserLifecycleManager.markDeleted(base, deletedAt);
  }
}
