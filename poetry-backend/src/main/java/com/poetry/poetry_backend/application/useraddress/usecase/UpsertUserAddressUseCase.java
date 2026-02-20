/*
 * File: UpsertUserAddressUseCase.java
 * Purpose: Creates or updates address data for a user.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.useraddress.usecase;

import com.poetry.poetry_backend.application.useraddress.port.UserAddressCommandPort;
import com.poetry.poetry_backend.domain.useraddress.model.UserAddress;

public class UpsertUserAddressUseCase {
  private final UserAddressCommandPort commands;

  public UpsertUserAddressUseCase(UserAddressCommandPort commands) {
    this.commands = commands;
  }

  public UserAddress execute(
      Long userId,
      String line1, String line2,
      String city, String state,
      String zip, String country) {
    return commands.upsert(
        userId, line1, line2, city, state, zip, country);
  }
}
