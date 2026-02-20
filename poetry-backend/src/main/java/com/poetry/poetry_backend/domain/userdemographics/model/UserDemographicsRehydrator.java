/*
 * File: UserDemographicsRehydrator.java
 * Purpose: Rebuilds UserDemographics from persisted data. Keeps construction
 * logic isolated from the JPA mapper and domain record.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.userdemographics.model;

import java.time.LocalDate;

public final class UserDemographicsRehydrator {
  private UserDemographicsRehydrator() {}

  public static UserDemographics rehydrate(
      Long id, Long userId,
      LocalDate birthDate, String gender, String phone) {
    return new UserDemographics(id, userId, birthDate, gender, phone);
  }
}
