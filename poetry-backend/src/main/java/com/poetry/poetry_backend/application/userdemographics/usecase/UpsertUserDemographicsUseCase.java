/*
 * File: UpsertUserDemographicsUseCase.java
 * Purpose: Creates or updates demographic data for a user. Delegates to the
 * command port so the use case stays free of persistence details.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.userdemographics.usecase;

import java.time.LocalDate;

import com.poetry.poetry_backend.application.userdemographics.port.UserDemographicsCommandPort;
import com.poetry.poetry_backend.domain.userdemographics.model.UserDemographics;

public class UpsertUserDemographicsUseCase {
  private final UserDemographicsCommandPort commands;

  public UpsertUserDemographicsUseCase(UserDemographicsCommandPort commands) {
    this.commands = commands;
  }

  public UserDemographics execute(
      Long userId, LocalDate birthDate, String gender, String phone) {
    return commands.upsert(userId, birthDate, gender, phone);
  }
}
