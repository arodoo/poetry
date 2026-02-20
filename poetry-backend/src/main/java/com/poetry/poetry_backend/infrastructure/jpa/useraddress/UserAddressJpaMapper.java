/*
 * File: UserAddressJpaMapper.java
 * Purpose: Converts UserAddressEntity to domain UserAddress.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.useraddress;

import com.poetry.poetry_backend.domain.useraddress.model.UserAddress;
import com.poetry.poetry_backend.domain.useraddress.model.UserAddressRehydrator;

public final class UserAddressJpaMapper {
  private UserAddressJpaMapper() {}

  public static UserAddress toDomain(UserAddressEntity e) {
    return UserAddressRehydrator.rehydrate(
        e.getId(), e.getUserId(),
        e.getLine1(), e.getLine2(),
        e.getCity(), e.getState(),
        e.getZip(), e.getCountry());
  }
}
