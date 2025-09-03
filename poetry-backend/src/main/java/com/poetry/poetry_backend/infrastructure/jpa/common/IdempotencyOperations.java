/*
 * File: IdempotencyOperations.java
 * Purpose: Core business logic for idempotency operations.
 * Handles registration, lookup, and storage of idempotency records.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.common;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.poetry.poetry_backend.application.common.port.IdempotencyPort;

public class IdempotencyOperations {
  private static final Logger log = LoggerFactory.getLogger(IdempotencyOperations.class);
  private final IdempotencyRepository repo;

  public IdempotencyOperations(IdempotencyRepository repo) {
    this.repo = repo;
  }

  public boolean register(String key) {
    if (key == null || key.isBlank()) {
      return true;
    }
    if (repo.findByKeyValue(key).isPresent()) {
      return false;
    }
    try {
      IdempotencyRecord r = new IdempotencyRecord();
      r.setKeyValue(key);
      repo.save(r);
      return true;
    } catch (RuntimeException e) {
      log.debug("Idempotency duplicate detected: {}", key);
      return false;
    }
  }

  public Optional<IdempotencyPort.StoredResponse> find(String key, String requestHash) {
    if (key == null || key.isBlank()) {
      return Optional.empty();
    }
    return repo.findByKeyValue(key).flatMap(r -> {
      if (r.getRequestHash() == null) {
        return Optional.empty();
      }
      if (!r.getRequestHash().equals(requestHash)) {
        return Optional.empty();
      }
      return Optional.of(new IdempotencyPort.StoredResponse(
          r.getRequestHash(),
          r.getResponseStatus() == null ? 200 : r.getResponseStatus(),
          r.getResponseContentType(),
          r.getResponseBody()));
    });
  }

  public void store(String key, String requestHash, int status,
      String contentType, String bodyJson) {
    if (key == null || key.isBlank()) {
      return;
    }
    IdempotencyRecord r = repo.findByKeyValue(key).orElseGet(() -> {
      IdempotencyRecord nr = new IdempotencyRecord();
      nr.setKeyValue(key);
      return nr;
    });
    r.setRequestHash(requestHash);
    r.setResponseStatus(status);
    r.setResponseContentType(contentType);
    r.setResponseBody(bodyJson);
    repo.save(r);
  }
}