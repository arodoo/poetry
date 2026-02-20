/*
 * File: UserAddressRehydrator.java
 * Purpose: Rebuilds UserAddress from persisted data.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.useraddress.model;

public final class UserAddressRehydrator {
  private UserAddressRehydrator() {}

  public static UserAddress rehydrate(
      Long id, Long userId,
      String line1, String line2,
      String city, String state,
      String zip, String country) {
    return new UserAddress(
        id, userId, line1, line2, city, state, zip, country);
  }
}
