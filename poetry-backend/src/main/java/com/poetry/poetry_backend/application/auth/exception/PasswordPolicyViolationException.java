/*
 * File: PasswordPolicyViolationException.java
 * Purpose: Thrown when a password fails policy validation rules such
 * as length, complexity, repetition or blacklist inclusion. Mapped to
 * 400 Bad Request with stable error code. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.exception;

public class PasswordPolicyViolationException extends RuntimeException {
  public PasswordPolicyViolationException(String message) { super(message); }
}
