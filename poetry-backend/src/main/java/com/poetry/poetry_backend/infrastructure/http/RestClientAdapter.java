/*
 * File: RestClientAdapter.java
 * Purpose: Adapter implementing HTTP client interactions for the
 * infrastructure layer. It provides a thin wrapper around RestClient
 * usage and translates responses and errors into application-friendly
 * types. Keeping adapters focused allows for easy replacement in tests
 * and respects the dependency inversion rule.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.http;

import java.util.Map;

import org.springframework.retry.support.RetryTemplate;

import com.poetry.poetry_backend.application.common.http.HttpClientPort;

public class RestClientAdapter implements HttpClientPort {
  private final org.springframework.web.client.RestClient restClient;
  private final RetryTemplate retryTemplate;

  public RestClientAdapter(
      org.springframework.web.client.RestClient restClient,
      RetryTemplate retryTemplate) {
    this.restClient = restClient;
    this.retryTemplate = retryTemplate;
  }

  @Override
  public <T> T get(String url, Map<String, String> headers, Class<T> type) {
    return HttpClientUtils.executeWithRetry(retryTemplate, () -> restClient
        .get()
        .uri(url)
        .headers(h -> headers.forEach(h::add))
        .retrieve()
        .body(type));
  }

  @Override
  public <T> T post(
      String url,
      Object body,
      Map<String, String> headers,
      Class<T> type) {
    return HttpClientUtils.executeWithRetry(retryTemplate, () -> restClient
        .post()
        .uri(url)
        .headers(h -> headers.forEach(h::add))
        .body(body)
        .retrieve()
        .body(type));
  }
}
