/*
 * File: UserDemographicsCommandPort.java
 * Purpose: Command operations for user demographics. Upsert creates a new
 * record or updates the existing one for the given userId.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.userdemographics.port;

import java.time.LocalDate;

import com.poetry.poetry_backend.domain.userdemographics.model.UserDemographics;

public interface UserDemographicsCommandPort {
  UserDemographics upsert(
      Long userId, LocalDate birthDate, String gender, String phone);
}
