/*
 * File: UserPasswordUpdater.java
 * Purpose: Validate password hash updates for compatibility while the domain
 * aggregate no longer stores the hash. Allows existing callers to ensure the
 * provided hash is sanitized before passing control to infrastructure layers.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.domain.user.model.updaters;

import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.domain.user.model.core.UserValidator;

public final class UserPasswordUpdater {
  private UserPasswordUpdater() {
  }

  public static User update(User base, String passwordHash) {
    UserValidator.requirePasswordHash(passwordHash);
    return base;
  }
}
