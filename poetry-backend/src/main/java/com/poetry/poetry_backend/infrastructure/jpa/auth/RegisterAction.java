/*
 * File: RegisterAction.java
 * Purpose: Orchestrates user registration delegating validation, rate limiting,
 * uniqueness checking, persistence, token issuance and idempotent replay to
 * focused support components. Keeps constructor wiring compact while preserving
 * behavioral parity with prior monolithic version. All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.util.Map;

import com.poetry.poetry_backend.application.auth.port.*;
import com.poetry.poetry_backend.application.common.port.IdempotencyPort;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

class RegisterAction { // Orchestrator only (thin facade over dedicated steps).
  private final RateLimiterPort limiter;
  private final PasswordPolicyPort passwordPolicy;
  private final EmailNormalizerPort emailNormalizer;

  private final RegisterIdempotencySupport idem;
  private final RegisterActionSupport support;
  private final RegisterUniquenessSupport uniqueness;
  private final RegisterPersistenceSupport persistence;
  private final RegisterTokenIssuanceSupport issuance;

  RegisterAction(
      UserJpaRepository users,
      PasswordHasherPort hasher,
      TokenGeneratorPort tokens,
      RefreshTokenManager manager,
      AuditLoggerPort audit,
      RateLimiterPort limiter,
      TokenResponseFactory factory,
      IdempotencyPort idempotency,
      PasswordPolicyPort policy,
      EmailNormalizerPort emailNormalizer) {
    this.limiter = limiter;
    this.passwordPolicy = policy;
    this.emailNormalizer = emailNormalizer;
    this.idem = new RegisterIdempotencySupport(idempotency, audit);
    this.support = new RegisterActionSupport();
    this.uniqueness = new RegisterUniquenessSupport(users, audit);
    this.persistence = new RegisterPersistenceSupport(users, hasher);
    this.issuance = new RegisterTokenIssuanceSupport(tokens, manager, audit, factory);
  }

  Map<String, Object> execute(Map<String, Object> payload, String key) {
    String username = (String) payload.get("username");
    String email = (String) payload.get("email");
    String password = (String) payload.get("password");
    support.validateInputs(username, email, password, passwordPolicy);

    limiter.acquire("register:" + username);
    String normEmail = emailNormalizer.normalize(email);

    String requestHash =
        support.hash(username + "|" + normEmail + "|" + password.length());
    var replay = idem.replay(key, requestHash);
    if (replay.isPresent()) {
      return replay.get();
    }

    uniqueness.ensureUnique(username, normEmail);
    var user = persistence.persistUser(username, normEmail, password);
    var response = issuance.issue(username, normEmail, user);
    idem.persist(key, requestHash, response);
    return response;
  }
}
