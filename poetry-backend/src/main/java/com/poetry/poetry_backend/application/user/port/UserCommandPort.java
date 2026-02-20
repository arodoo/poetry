/*
 * File: UserCommandPort.java
 * Purpose: Define commands related to user lifecycle and mutations used by
 * the application layer. This port exposes operations for creating, updating
 * and soft-deleting users while shielding application logic from persistence
 * details.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.user.port;

import java.time.LocalDate;
import java.util.Set;

import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.interfaces.v1.user.dto.AddressRequest;

public interface UserCommandPort {
  User create(
      String firstName, String lastName,
      String email, String username, String locale,
      String password, Set<String> roles, String status,
      LocalDate birthDate, String gender,
      String phone, AddressRequest address);

  User update(
      Long id, long version,
      String firstName, String lastName,
      String email, String locale,
      Set<String> roles, String status,
      LocalDate birthDate, String gender,
      String phone, AddressRequest address);

  User updatePassword(Long id, long version, String password);

  void softDelete(Long id, long version);
}
