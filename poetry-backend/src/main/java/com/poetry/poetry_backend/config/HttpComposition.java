/*
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.web.client.RestClient;

import com.poetry.poetry_backend.application.common.http.HttpClientPort;
import com.poetry.poetry_backend.application.common.port.ETagPort;
import com.poetry.poetry_backend.infrastructure.http.ETagSha256Adapter;
import com.poetry.poetry_backend.infrastructure.http.RestClientAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.common.IdempotencyJpaAdapter;
import com.poetry.poetry_backend.infrastructure.jpa.common.IdempotencyRepository;

@Configuration
public class HttpComposition {
  @Bean
  ETagPort eTagPort() {
    return new ETagSha256Adapter();
  }

  @Bean
  IdempotencyJpaAdapter idempotencyJpaAdapter(IdempotencyRepository repo) {
    return new IdempotencyJpaAdapter(repo);
  }

  @Bean
  HttpClientPort httpClientPort(
      RestClient restClient, RetryTemplate httpRetryTemplate) {
    return new RestClientAdapter(restClient, httpRetryTemplate);
  }
}
