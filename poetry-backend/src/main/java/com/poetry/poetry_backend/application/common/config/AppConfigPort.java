/*
 * File: AppConfigPort.java
 * Purpose: Provide an abstraction for accessing application configuration
 * values (typed) required by the application layer. Implementations read
 * from environment, properties or remote config providers and must expose a
 * stable contract so the application remains decoupled from configuration
 * sources. This port improves testability by allowing fake configurations in
 * tests.
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
