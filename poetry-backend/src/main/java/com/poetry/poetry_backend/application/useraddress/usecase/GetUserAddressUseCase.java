/*
 * File: GetUserAddressUseCase.java
 * Purpose: Retrieves address for a user by userId.
 * Returns empty Optional when no address exists yet.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.useraddress.usecase;

import java.util.Optional;

import com.poetry.poetry_backend.application.useraddress.port.UserAddressQueryPort;
import com.poetry.poetry_backend.domain.useraddress.model.UserAddress;

public class GetUserAddressUseCase {
  private final UserAddressQueryPort queries;

  public GetUserAddressUseCase(UserAddressQueryPort queries) {
    this.queries = queries;
  }

  public Optional<UserAddress> execute(Long userId) {
    return queries.findByUserId(userId);
  }
}
