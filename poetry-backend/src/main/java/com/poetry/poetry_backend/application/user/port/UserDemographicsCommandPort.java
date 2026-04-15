/*
 * File: UserDemographicsCommandPort.java
 * Purpose: Port defining write operations for user demographics.
 * Enables cascade deletion when a user account is removed.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.port;

public interface UserDemographicsCommandPort {
  void deleteByUserId(Long userId);
}
