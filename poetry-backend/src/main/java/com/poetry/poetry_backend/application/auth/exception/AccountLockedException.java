/*
 * File: AccountLockedException.java
 * Purpose: Signals that an account is temporarily locked due to repeated
 * failed authentication attempts. Thrown before password verification to
 * enforce adaptive defense against brute force attacks and mapped to 423
 * Locked via problem handler for a user friendly message. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.exception;

public class AccountLockedException extends RuntimeException {
  public AccountLockedException(String message) { super(message); }
}