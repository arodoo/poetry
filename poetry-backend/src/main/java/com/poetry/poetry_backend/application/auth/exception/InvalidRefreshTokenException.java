/*
 * File: InvalidRefreshTokenException.java
 * Purpose: Indicates that a supplied refresh token is invalid, expired or
 * unrecognized by the authentication subsystem. This exception is mapped to
 * HTTP 401 responses while avoiding exposure of internal reasons for
 * security. Supports clear separation of concerns for error handling.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.exception;

public class InvalidRefreshTokenException extends RuntimeException {
  public InvalidRefreshTokenException(String message) { super(message); }
}
