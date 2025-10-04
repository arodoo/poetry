/*
 * File: InvalidUserException.java
 * Purpose: Exception for invalid or non-existent user assignments thrown when
 * a seller code is created or updated with a userId that does not exist in
 * the system ensuring referential integrity at domain level.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.sellercode.exception;

public class InvalidUserException extends RuntimeException {
  public InvalidUserException(String message) {
    super(message);
  }

  public static InvalidUserException userNotFound(Long userId) {
    return new InvalidUserException("User with id " + userId + " not found");
  }
}
