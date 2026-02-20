/*
 * File: UserDemographicsNotFoundException.java
 * Purpose: Thrown when demographics for a given userId do not exist.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.userdemographics.exception;

public class UserDemographicsNotFoundException extends RuntimeException {
  public UserDemographicsNotFoundException(Long userId) {
    super("Demographics not found for user " + userId);
  }
}
