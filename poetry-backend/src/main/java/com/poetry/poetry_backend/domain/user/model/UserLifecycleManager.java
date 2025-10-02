/*
 * File: UserLifecycleManager.java
 * Purpose: Manage active and deletion state transitions for User aggregates.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model;

import java.time.Instant;

public final class UserLifecycleManager {
  private UserLifecycleManager() { }

  public static User updateActive(User base, boolean active) {
    if (base.isDeleted()) {
      throw new IllegalStateException("Deleted users cannot change active state");
    }
    return UserRehydrator.rehydrate(
        base.id(),
        base.firstName(),
        base.lastName(),
        base.email(),
        base.username(),
        base.locale(),
        active,
        base.roles(),
        base.createdAt(),
        base.updatedAt(),
        base.deletedAt(),
        base.version());
  }

  public static User markDeleted(User base, Instant deletedAt) {
    Instant value = deletedAt == null ? Instant.now() : deletedAt;
    return UserRehydrator.rehydrate(
        base.id(),
        base.firstName(),
        base.lastName(),
        base.email(),
        base.username(),
        base.locale(),
        false,
        base.roles(),
        base.createdAt(),
        base.updatedAt(),
        value,
        base.version());
  }
}
