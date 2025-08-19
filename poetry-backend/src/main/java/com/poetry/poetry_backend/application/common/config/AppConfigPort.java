/*
 * All Rights Reserved. Arodi Emmanuel
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
