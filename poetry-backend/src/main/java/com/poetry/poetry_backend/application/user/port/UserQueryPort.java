/*
 File: UserQueryPort.java
 Purpose: Declares read-side operations for the User aggregate. It
   provides queries to list users and fetch a user by id, abstracting
   away data source and mapping concerns. Adapters supply the concrete
   retrieval strategy.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.user.port;

import java.util.List;

import com.poetry.poetry_backend.domain.user.model.User;

public interface UserQueryPort {
  List<User> findAll();

  User findById(Long id);
}
