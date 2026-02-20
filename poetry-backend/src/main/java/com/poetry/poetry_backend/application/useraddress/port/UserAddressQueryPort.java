/*
 * File: UserAddressQueryPort.java
 * Purpose: Query operations for user address. Lookup is by userId.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.useraddress.port;

import java.util.Optional;

import com.poetry.poetry_backend.domain.useraddress.model.UserAddress;

public interface UserAddressQueryPort {
  Optional<UserAddress> findByUserId(Long userId);
}
