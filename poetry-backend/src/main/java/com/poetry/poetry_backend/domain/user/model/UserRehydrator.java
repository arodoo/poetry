/*
 * File: UserRehydrator.java
 * Purpose: Rebuild User aggregates from persisted representations while
 * reapplying validation rules to guard against inconsistent records. Keeps
 * factory logic modular to respect file length policies.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model;

import java.time.Instant;
import java.util.Set;

public final class UserRehydrator {
  private UserRehydrator() { }

  public static User rehydrate(
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
  String normalizedFirst =
    firstName == null || firstName.isBlank() ? username : firstName;
  String normalizedLast =
    lastName == null || lastName.isBlank() ? username : lastName;
    return new User(
        id,
    UserValidator.requireName("firstName", normalizedFirst),
    UserValidator.requireName("lastName", normalizedLast),
        UserValidator.requireEmail(email),
        UserValidator.requireUsername(username),
        UserValidator.requireLocale(locale),
        status == null || status.isBlank() ? "active" : status,
        UserValidator.requireRoles(roles),
        createdAt,
        updatedAt,
        deletedAt,
        version);
  }
}
