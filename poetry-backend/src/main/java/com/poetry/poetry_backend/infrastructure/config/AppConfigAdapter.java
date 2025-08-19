/*
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.config;

import java.util.List;

import com.poetry.poetry_backend.application.common.config.AppConfigPort;

public class AppConfigAdapter implements AppConfigPort {
  private final AppProperties props;

  public AppConfigAdapter(AppProperties props) {
    this.props = props;
  }

  @Override
  public String apiBasePath() { return props.apiBasePath(); }

  @Override
  public List<String> corsAllowedOrigins() {
    return props.corsAllowedOrigins();
  }

  @Override
  public int idempotencyTtlSeconds() { return props.idempotencyTtlSeconds(); }

  @Override
  public boolean logJson() { return props.logJson(); }

  @Override
  public int httpConnectTimeoutMs() { return props.httpConnectTimeoutMs(); }

  @Override
  public int httpReadTimeoutMs() { return props.httpReadTimeoutMs(); }

  @Override
  public int httpRetryMaxAttempts() { return props.httpRetryMaxAttempts(); }

  @Override
  public int httpRetryBackoffMs() { return props.httpRetryBackoffMs(); }
}
