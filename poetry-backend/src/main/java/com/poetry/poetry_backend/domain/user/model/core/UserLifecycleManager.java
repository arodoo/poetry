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
      throw new IllegalStateException("error.user.deleted.status");
    }
    return UserRehydrator.rehydrate(
        base.id(), base.firstName(), base.lastName(),
        base.email(), base.username(), base.locale(),
        status, base.roles(),
        base.birthDate(), base.gender(), base.phone(),
        base.addressLine1(), base.addressLine2(),
        base.addressCity(), base.addressState(),
        base.addressZip(), base.addressCountry(),
        base.createdAt(), base.updatedAt(),
        base.deletedAt(), base.version());
  }

  public static User markDeleted(User base, Instant deletedAt) {
    Instant value = deletedAt == null ? Instant.now() : deletedAt;
    return UserRehydrator.rehydrate(
        base.id(), base.firstName(), base.lastName(),
        base.email(), base.username(), base.locale(),
        "inactive", base.roles(),
        base.birthDate(), base.gender(), base.phone(),
        base.addressLine1(), base.addressLine2(),
        base.addressCity(), base.addressState(),
        base.addressZip(), base.addressCountry(),
        base.createdAt(), base.updatedAt(),
        value, base.version());
  }
}
