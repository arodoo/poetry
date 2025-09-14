/*
 * File: AuthQueryPort.java
 * Purpose: Read port for Auth aggregate queries.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.auth.port;

import java.util.List;
import java.util.Optional;

import com.poetry.poetry_backend.domain.auth.model.Auth;

public interface AuthQueryPort {
  List<Auth> findAll();
  Optional<Auth> findById(String id);
}
