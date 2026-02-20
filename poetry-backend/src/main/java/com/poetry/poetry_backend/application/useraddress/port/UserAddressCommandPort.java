/*
 * File: UserAddressCommandPort.java
 * Purpose: Command operations for user address. Upsert creates or updates
 * the address record for the given userId.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.useraddress.port;

import com.poetry.poetry_backend.domain.useraddress.model.UserAddress;

public interface UserAddressCommandPort {
  UserAddress upsert(
      Long userId,
      String line1, String line2,
      String city, String state,
      String zip, String country);
}
