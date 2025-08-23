/*
 * File: InvalidCredentialsException.java
 * Purpose: Signals that provided authentication credentials are invalid.
 * This domain/application level exception maps to an HTTP 401 in the
 * interface layer and is thrown by authentication adapters when username
 * or password verification fails. Keeps transport concerns decoupled.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.auth.exception;

public class InvalidCredentialsException extends RuntimeException {
  public InvalidCredentialsException(String message) { super(message); }
}
