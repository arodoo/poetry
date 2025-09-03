/*
 * File: UserNotFoundException.java
 * Purpose: Domain exception for missing User aggregate using shared not-found base.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.domain.user.exception;

import com.poetry.poetry_backend.domain.shared.exception.AbstractNotFoundException;

public class UserNotFoundException extends AbstractNotFoundException {
  public UserNotFoundException(Long id) {
    super("user", String.valueOf(id), "User not found: " + id);
  }
}
