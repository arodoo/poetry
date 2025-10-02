/*
 * File: UserCommandPort.java
 * Purpose: Define commands related to user lifecycle and mutations used by the
 * application layer. This port exposes operations for creating, updating and
 * soft-deleting users while shielding application logic from persistence
 * details. Implementations must honor the declared method signatures and
 * preserve domain invariants when applying changes.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.port;

import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.User;

public interface UserCommandPort {
  User create(
      String firstName,
      String lastName,
      String email,
      String username,
    String locale,
      String password,
      Set<String> roles);

  User update(
      Long id,
    long version,
      String firstName,
      String lastName,
      String email,
    String locale,
      Set<String> roles,
      boolean active);

  User updatePassword(Long id, long version, String password);

  void softDelete(Long id, long version);
}
