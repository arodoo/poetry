/*
 * File: IdempotencyJpaAdapter.java
 * Purpose: JPA adapter responsible for storing and retrieving idempotency
 * records used by idempotent endpoints. This adapter maps domain operations
 * to database entities and provides a persistence-backed implementation
 * of idempotency storage to ensure correctness across restarts.
 * Extended to support request hash validation and stored response replay.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.common;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.application.common.port.IdempotencyPort;

@Transactional
public class IdempotencyJpaAdapter implements IdempotencyPort {
  private static final Logger log =
      LoggerFactory.getLogger(IdempotencyJpaAdapter.class);
  private final IdempotencyRepository repo;

  public IdempotencyJpaAdapter(IdempotencyRepository repo) {
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

  @Override
  public Optional<StoredResponse> find(String key, String requestHash) {
    if (key == null || key.isBlank()) return Optional.empty();
    return repo.findByKeyValue(key).flatMap(r -> {
      if (r.getRequestHash() == null) return Optional.empty();
      if (!r.getRequestHash().equals(requestHash)) return Optional.empty();
      return Optional.of(new StoredResponse(
          r.getRequestHash(),
          r.getResponseStatus() == null ? 200 : r.getResponseStatus(),
          r.getResponseContentType(),
          r.getResponseBody()));
    });
  }

  @Override
  public void store(
      String key, String requestHash, int status, String contentType, String bodyJson) {
    if (key == null || key.isBlank()) return;
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
