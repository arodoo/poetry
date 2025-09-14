/*
 * File: AuthNotFoundException.java
 * Purpose: Not-found exception for Auth aggregate.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.auth.exception;

import com.poetry.poetry_backend.domain.shared.exception.AbstractNotFoundException;

public class AuthNotFoundException extends AbstractNotFoundException {
  public AuthNotFoundException(String id) {
    super("auth", id, "auth.not_found");
  }
}
