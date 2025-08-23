/*
 * File: InMemoryIdempotencyStore.java
 * Purpose: Handles idempotency key storage and lookup for duplicate request
 * detection in the in-memory auth adapter. Provides basic caching of
 * registration requests by idempotency key for testing environments.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.memory.auth;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

class InMemoryIdempotencyStore {
  private final Map<String, Map<String, Object>> store = new ConcurrentHashMap<>();

  Map<String, Object> getExisting(String key) {
    return key != null ? store.get(key) : null;
  }

  void store(String key, Map<String, Object> response) {
    if (key != null) {
      store.put(key, response);
    }
  }
}
