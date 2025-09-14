/*
 * File: AuthCommandPort.java
 * Purpose: Write port for Auth aggregate commands.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.port;

import com.poetry.poetry_backend.domain.auth.model.Auth;

public interface AuthCommandPort {
  Auth create(String id, String username);
  Auth update(String id, String username);
  void delete(String id);
}
