/*
 * File: GetUserDemographicsUseCase.java
 * Purpose: Retrieves demographics for a user by their userId.
 * Returns empty Optional when no demographics exist yet.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.userdemographics.usecase;

import java.util.Optional;

import com.poetry.poetry_backend.application.userdemographics.port.UserDemographicsQueryPort;
import com.poetry.poetry_backend.domain.userdemographics.model.UserDemographics;

public class GetUserDemographicsUseCase {
  private final UserDemographicsQueryPort queries;

  public GetUserDemographicsUseCase(UserDemographicsQueryPort queries) {
    this.queries = queries;
  }

  public Optional<UserDemographics> execute(Long userId) {
    return queries.findByUserId(userId);
  }
}
