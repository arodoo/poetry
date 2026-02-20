/*
 * File: UserDemographicsQueryPort.java
 * Purpose: Query operations for user demographics. Lookup is always by userId
 * since demographics have a 1:1 relationship with the user.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.userdemographics.port;

import java.util.Optional;

import com.poetry.poetry_backend.domain.userdemographics.model.UserDemographics;

public interface UserDemographicsQueryPort {
  Optional<UserDemographics> findByUserId(Long userId);
}
