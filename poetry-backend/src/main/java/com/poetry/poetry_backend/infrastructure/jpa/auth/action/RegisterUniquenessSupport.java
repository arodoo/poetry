/*
 * File: RegisterUniquenessSupport.java
 * Purpose: Encapsulates duplicate user detection logic for registration.
 * Abstracts repository queries and audit side effects so orchestrator stays
 * linear and compact while enforcing uniqueness invariants. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth.action;

import com.poetry.poetry_backend.application.auth.exception.DuplicateUserException;
import com.poetry.poetry_backend.application.auth.port.support.AuditLoggerPort;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

final class RegisterUniquenessSupport {
  private final UserJpaRepository users;
  private final AuditLoggerPort audit;

  RegisterUniquenessSupport(UserJpaRepository users, AuditLoggerPort audit) {
    this.users = users;
    this.audit = audit;
  }

  void ensureUnique(String username, String email) {
    if (users.existsByUsername(username) || users.existsByEmail(email)) {
      audit.record("register.fail", username, "duplicate");
      throw new DuplicateUserException("duplicate");
    }
  }
}
