/*
 * File: DuplicateUserException.java
 * Purpose: Thrown when attempting to register a user with a username that
 * already exists within the authentication user store. This exception maps
 * to HTTP 409 Conflict at the interface layer and preserves domain
 * semantics without leaking infrastructure details.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.exception;

public class DuplicateUserException extends RuntimeException {
  public DuplicateUserException(String message) { super(message); }
}
