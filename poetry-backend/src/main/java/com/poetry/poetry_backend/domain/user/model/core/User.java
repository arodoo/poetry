/*
 * File: User.java
 * Purpose: Immutable record storing user aggregate state. Validation and
 * mutation rules live in accompanying domain services to keep this record
 * concise and under the enforced line budget while guaranteeing domain logic
 * remains colocated within the user package.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model.core;

import java.time.Instant;
import java.util.Set;

public record User(
    Long id,
    String firstName,
    String lastName,
    String email,
    String username,
    String locale,
    String status,
    Set<String> roles,
    Instant createdAt,
    Instant updatedAt,
    Instant deletedAt,
    long version) {
  public boolean isDeleted() {
    return deletedAt != null;
  }
}
