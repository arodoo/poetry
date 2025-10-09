/*
 * File: UserFactory.java
 * Purpose: Factory helpers to build User aggregates either for new
 * creations or when rehydrating from persistence stores. Applies the
 * shared validation rules declared in UserValidator and normalizes
 * optional timestamps.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model;

import java.util.Set;

public final class UserFactory {
  private UserFactory() { }

  public static User createNew(
      String firstName,
      String lastName,
      String email,
      String username,
      String locale,
      Set<String> roles) {
    return new User(
        null,
        UserValidator.requireName("firstName", firstName),
        UserValidator.requireName("lastName", lastName),
        UserValidator.requireEmail(email),
        UserValidator.requireUsername(username),
        UserValidator.requireLocale(locale),
        "active",
        UserValidator.requireRoles(roles),
        null,
        null,
        null,
        0L);
  }
}
