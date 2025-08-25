/*
 * File: IdempotencyPort.java
 * Purpose: Define an abstraction for idempotency key storage and validation
 * used by the application to support safe retries and deduplication of
 * requests. The port allows application use-cases and filters to persist
 * idempotency records and query whether a request has been processed. This
 * separation enables different storage strategies without impacting app code.
 * Extended to support full response replay with request hash validation.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.common.port;

import java.util.Optional;

public interface IdempotencyPort {
  boolean register(String key);

  Optional<StoredResponse> find(String key, String requestHash);

  void store(String key, String requestHash, int status, String contentType, String bodyJson);

  record StoredResponse(String requestHash, int status, String contentType, String bodyJson) {}
}
