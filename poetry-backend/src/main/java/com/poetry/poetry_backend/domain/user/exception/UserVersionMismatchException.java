/*
 * File: UserVersionMismatchException.java
 * Purpose: Raised when concurrency control detects a stale user version
 * during mutating operations, signalling clients to refresh state.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.exception;

public class UserVersionMismatchException extends RuntimeException {
  public UserVersionMismatchException(Long id) {
    super("users.error.version-conflict");
  }
}
