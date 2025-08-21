/*
 * File: HttpClientPort.java
 * Purpose: Declare an abstraction over HTTP clients used by application code
 * to perform outbound HTTP requests. Implementations live in the
 * infrastructure layer and must adapt third-party HTTP libraries to this
 * port's interface, preserving application testability and avoiding direct
 * framework imports in application code. The port simplifies mocking in
 * unit tests.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.application.common.http;

import java.util.Map;

public interface HttpClientPort {
  <T> T get(String url, Map<String, String> headers, Class<T> responseType);

  <T> T post(
      String url,
      Object requestBody,
      Map<String, String> headers,
      Class<T> responseType);
}
