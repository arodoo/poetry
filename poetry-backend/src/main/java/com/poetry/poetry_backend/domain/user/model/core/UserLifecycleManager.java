/*
 * File: UserLifecycleManager.java
 * Purpose: Manage active and deletion state transitions for User aggregates.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model.core;

import java.time.Instant;

public final class UserLifecycleManager {
  private UserLifecycleManager() { }

  public static User updateStatus(User base, String status) {
    if (base.isDeleted()) {
      throw new IllegalStateException("Deleted users cannot change status");
    }
    return UserRehydrator.rehydrate(
        base.id(),
        base.firstName(),
        base.lastName(),
        base.email(),
        base.username(),
        base.locale(),
        status,
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
        "inactive",
        base.roles(),
        base.createdAt(),
        base.updatedAt(),
        value,
        base.version());
  }
}
