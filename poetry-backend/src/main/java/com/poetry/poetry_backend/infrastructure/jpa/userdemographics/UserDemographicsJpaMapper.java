/*
 * File: UserDemographicsJpaMapper.java
 * Purpose: Converts UserDemographicsEntity to domain UserDemographics.
 * Isolates mapping logic so adapters stay focused on persistence.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.userdemographics;

import com.poetry.poetry_backend.domain.userdemographics.model.UserDemographics;
import com.poetry.poetry_backend.domain.userdemographics.model.UserDemographicsRehydrator;

public final class UserDemographicsJpaMapper {
  private UserDemographicsJpaMapper() {}

  public static UserDemographics toDomain(UserDemographicsEntity e) {
    return UserDemographicsRehydrator.rehydrate(
        e.getId(), e.getUserId(),
        e.getBirthDate(), e.getGender(), e.getPhone());
  }
}
