/*
 File: AppConfigPort.java
 Purpose: Application-level configuration boundary. It exposes typed and
   validated settings required by use cases and infrastructure adapters.
   Values include base paths, CORS, ETag/idempotency TTLs, and HTTP
   client timeouts/retries.
 All Rights Reserved. Arodi Emmanuel
*/
package com.poetry.poetry_backend.application.common.config;

import java.util.List;

public interface AppConfigPort {
  String apiBasePath();
  List<String> corsAllowedOrigins();
  int idempotencyTtlSeconds();
  boolean logJson();
  // HTTP client timeouts and retries
  int httpConnectTimeoutMs();
  int httpReadTimeoutMs();
  int httpRetryMaxAttempts();
  int httpRetryBackoffMs();
}
