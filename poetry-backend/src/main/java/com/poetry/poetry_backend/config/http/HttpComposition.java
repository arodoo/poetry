/*
 * File: HttpComposition.java
 * Purpose: Composition and wiring for HTTP client adapters and helpers.
 * It configures RestClient-related beans and utilities such as retry
 * templates and request factories to be used across infrastructure. This
 * isolates HTTP concerns from application logic and keeps integrations
 * configurable and testable. All idempotency wiring lives in
 * AuthSupportCoreConfig to avoid duplicate beans.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config.http;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.web.client.RestClient;

import com.poetry.poetry_backend.application.common.http.HttpClientPort;
import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.infrastructure.http.ETagSha256Adapter;
import com.poetry.poetry_backend.infrastructure.http.RestClientAdapter;

@Configuration
public class HttpComposition {
  @Bean
  ETagPort eTagPort() {
    return new ETagSha256Adapter();
  }

  @Bean
  HttpClientPort httpClientPort(
      RestClient restClient, RetryTemplate httpRetryTemplate) {
    return new RestClientAdapter(restClient, httpRetryTemplate);
  }
}
