/*
 * File: UserRehydrator.java
 * Purpose: Rebuild User aggregates from persisted representations while
 * reapplying validation rules to guard against inconsistent records.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model.core;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Set;

public final class UserRehydrator {
  private UserRehydrator() { }

  public static User rehydrate(
      Long id, String firstName, String lastName,
      String email, String username, String locale,
      String status, Set<String> roles,
      LocalDate birthDate, String gender, String phone,
      String addressLine1, String addressLine2,
      String addressCity, String addressState,
      String addressZip, String addressCountry,
      Instant createdAt, Instant updatedAt,
      Instant deletedAt, long version) {
    String nFirst = firstName == null || firstName.isBlank()
        ? username : firstName;
    String nLast = lastName == null || lastName.isBlank()
        ? username : lastName;
    return new User(id,
        UserValidator.requireName("firstName", nFirst),
        UserValidator.requireName("lastName", nLast),
        UserValidator.requireEmail(email),
        UserValidator.requireUsername(username),
        UserValidator.requireLocale(locale),
        status == null || status.isBlank() ? "active" : status,
        UserValidator.requireRoles(roles),
        birthDate, gender, phone,
        addressLine1, addressLine2, addressCity,
        addressState, addressZip, addressCountry,
        createdAt, updatedAt, deletedAt, version);
  }
}
