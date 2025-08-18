/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.user.port;

import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.User;

public interface UserCommandPort {
  User create(
      String firstName,
      String lastName,
      String email,
      String username,
      String password,
      Set<String> roles);

  User update(
      Long id,
      String firstName,
      String lastName,
      String email,
      Set<String> roles,
      boolean active);

  void softDelete(Long id);
}
