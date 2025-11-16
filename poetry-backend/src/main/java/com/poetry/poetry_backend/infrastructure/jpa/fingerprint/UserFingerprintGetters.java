/*
 * File: UserFingerprintGetters.java
 * Purpose: Getters for UserFingerprintEntity to reduce file length.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint;

public class UserFingerprintGetters {
  private UserFingerprintGetters() {}

  public static Long getId(UserFingerprintEntity entity) {
    return entity.getId();
  }

  public static Long getUserId(UserFingerprintEntity entity) {
    return entity.getUserId();
  }

  public static Long getFingerprintId(UserFingerprintEntity entity) {
    return entity.getFingerprintId();
  }

  public static boolean isActive(UserFingerprintEntity entity) {
    return entity.isActive();
  }
}
