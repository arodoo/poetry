/*
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.common.http;

/* File: HttpClientPort.java
 * Purpose: Defines a framework-agnostic HTTP client abstraction used by
 * application services to perform outbound calls without depending on
 * Infrastructure details. Centralizes timeouts and retries behind a stable
 * API to ensure consistent policies. Enables unit testing by mocking the port
 * while real behavior is provided by Infrastructure adapters.
 * All Rights Reserved. Arodi Emmanuel
 */

import java.util.Map;

public interface HttpClientPort {
  <T> T get(String url, Map<String, String> headers, Class<T> responseType);

  <T> T post(
      String url,
      Object requestBody,
      Map<String, String> headers,
      Class<T> responseType);
}
