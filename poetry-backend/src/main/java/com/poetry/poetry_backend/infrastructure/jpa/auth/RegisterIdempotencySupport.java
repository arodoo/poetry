/*
 * File: RegisterIdempotencySupport.java
 * Purpose: Extracts idempotency lookup and storage concerns from
 * RegisterAction to keep execution logic compact and under line
 * limits while preserving behavior and testability. It manages replay
 * detection, audit recording and persistence of successful responses.
 * This enables deterministic client retries without duplication.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.auth;

import java.util.Map;
import java.util.Optional;

import com.poetry.poetry_backend.application.auth.port.AuditLoggerPort;
import com.poetry.poetry_backend.application.common.port.IdempotencyPort;

class RegisterIdempotencySupport {
  private final IdempotencyPort idempotency;
  private final AuditLoggerPort audit;

  RegisterIdempotencySupport(IdempotencyPort idempotency, AuditLoggerPort audit) {
    this.idempotency = idempotency;
    this.audit = audit;
  }

  Optional<Map<String, Object>> replay(String key, String requestHash) {
    if (key == null) return Optional.empty();
    var stored = idempotency.find(key, requestHash);
    if (stored.isPresent()) {
      audit.record("register.idempotent_replay", "-", key);
      return Optional.of(JsonHelper.readMap(stored.get().bodyJson()));
    }
    return Optional.empty();
  }

  void persist(String key, String requestHash, Map<String, Object> body) {
    if (key == null) return;
    idempotency.store(key, requestHash, 200, "application/json", JsonHelper.write(body));
  }
}
