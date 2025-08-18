/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.user.port;

import java.util.List;

import com.poetry.poetry_backend.domain.user.model.User;

public interface UserQueryPort {
  List<User> findAll();

  User findById(Long id);
}
