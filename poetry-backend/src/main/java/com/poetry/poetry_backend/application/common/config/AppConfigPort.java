/*
 File: ${file}
 Purpose: This source file is part of Poetry.
 It follows DDD and Clean Architecture. Lines
 are wrapped to 80 characters for readability.
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
