/*
 * File: RegisterPersistenceSupport.java
 * Purpose: Handles creation and storage of new user entities during
 * registration. Isolates entity construction and hashing to keep
 * orchestration surface minimal and test focused. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.action;

import java.util.HashSet;
import java.util.Set;

import com.poetry.poetry_backend.application.auth.port.PasswordHasherPort;
import com.poetry.poetry_backend.domain.auth.model.Role;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

final class RegisterPersistenceSupport {
  private final UserJpaRepository users;
  private final PasswordHasherPort hasher;

  RegisterPersistenceSupport(UserJpaRepository users, PasswordHasherPort hasher) {
    this.users = users;
    this.hasher = hasher;
  }

  UserEntity persistUser(String username, String email, String password) {
    var ent = new UserEntity();
    ent.setUsername(username);
    ent.setEmail(email);
    ent.setPasswordHash(hasher.hash(password));
    ent.setFirstName(username);
    ent.setLastName(username);
    ent.setRoles(new HashSet<>(Set.of(Role.ADMIN.key())));
    return users.save(ent);
  }
}
