/*
 * File: UserDemographicsCommandAdapter.java
 * Purpose: JPA implementation of UserDemographicsCommandPort.
 * Deletes demographics records by userId for cascade cleanup.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.userdemographics;

import com.poetry.poetry_backend.application.user.port.UserDemographicsCommandPort;

public class UserDemographicsCommandAdapter
    implements UserDemographicsCommandPort {
  private final UserDemographicsJpaRepository repo;

  public UserDemographicsCommandAdapter(
      UserDemographicsJpaRepository repo) {
    this.repo = repo;
  }

  @Override
  public void deleteByUserId(Long userId) {
    repo.findByUserId(userId).ifPresent(repo::delete);
  }
}
